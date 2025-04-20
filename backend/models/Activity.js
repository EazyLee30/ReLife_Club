import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['online', 'offline', 'hybrid']
  },
  category: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: function() {
      return this.type !== 'online';
    }
  },
  onlineLink: {
    type: String,
    required: function() {
      return this.type !== 'offline';
    }
  },
  maxParticipants: {
    type: Number,
    required: true
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'ongoing', 'completed', 'cancelled'],
    default: 'draft'
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  instructors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  volunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['participant', 'instructor', 'volunteer']
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  }],
  requirements: {
    minAge: Number,
    maxAge: Number,
    gender: String,
    skills: [String]
  },
  points: {
    type: Number,
    default: 0
  },
  tags: [String],
  images: [String]
}, {
  timestamps: true
});

// 更新活动状态的方法
activitySchema.methods.updateStatus = function() {
  const now = new Date();
  if (this.status === 'published' && now >= this.startTime) {
    this.status = 'ongoing';
  }
  if (this.status === 'ongoing' && now >= this.endTime) {
    this.status = 'completed';
  }
  return this.save();
};

// 检查用户是否可以加入活动
activitySchema.methods.canJoin = function(userId) {
  if (this.status !== 'published') {
    return false;
  }
  if (this.currentParticipants >= this.maxParticipants) {
    return false;
  }
  return !this.participants.some(p => p.user.toString() === userId.toString());
};

// 更新参与者数量
activitySchema.methods.updateParticipantsCount = function() {
  this.currentParticipants = this.participants.filter(p => p.status === 'approved').length;
  return this.save();
};

const Activity = mongoose.model('Activity', activitySchema);

export default Activity; 