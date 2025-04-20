import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: function() {
      return !this.wechatOpenId && !this.googleId;
    },
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'instructor', 'organizer', 'admin'],
    default: 'user'
  },
  avatar: String,
  profile: {
    nickname: {
      type: String,
      trim: true
    },
    lastNicknameUpdate: {
      type: Date,
      default: null
    },
    gender: String,
    location: String,
    bio: String,
    interests: [String],
    badges: [{
      type: String,
      enum: ['instructor', 'organizer', 'volunteer', 'expert']
    }]
  },
  // 微信登录相关字段
  wechatOpenId: {
    type: String,
    unique: true,
    sparse: true
  },
  wechatUnionId: {
    type: String,
    unique: true,
    sparse: true
  },
  // 谷歌登录相关字段
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  // 用户活动参与记录
  activities: [{
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity'
    },
    role: {
      type: String,
      enum: ['participant', 'organizer', 'instructor', 'volunteer']
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed'],
      default: 'pending'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  // 用户统计信息
  stats: {
    coursesCreated: {
      type: Number,
      default: 0
    },
    activitiesOrganized: {
      type: Number,
      default: 0
    },
    eventsAttended: {
      type: Number,
      default: 0
    },
    points: {
      type: Number,
      default: 0
    },
    level: {
      type: Number,
      default: 1
    },
    contributions: {
      courses: {
        type: Number,
        default: 0
      },
      activities: {
        type: Number,
        default: 0
      },
      communities: {
        type: Number,
        default: 0
      }
    }
  },
  // 其他字段
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  wallet: {
    balance: {
      type: Number,
      default: 0
    },
    transactions: [{
      type: {
        type: String,
        enum: ['income', 'expense']
      },
      amount: Number,
      description: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  roleApplications: [{
    role: {
      type: String,
      enum: ['instructor', 'organizer', 'volunteer', 'expert']
    },
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity'
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    reason: String,
    appliedAt: {
      type: Date,
      default: Date.now
    },
    reviewedAt: Date,
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewNote: String
  }]
});

// 密码加密
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 验证密码
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// 检查是否可以更新昵称
userSchema.methods.canUpdateNickname = function() {
  if (!this.profile.lastNicknameUpdate) return true;
  const lastUpdate = new Date(this.profile.lastNicknameUpdate);
  const now = new Date();
  const diffHours = Math.floor((now - lastUpdate) / (1000 * 60 * 60));
  return diffHours >= 24;
};

// 更新用户等级
userSchema.methods.updateLevel = function() {
  const { points, contributions } = this.stats;
  const totalContributions = 
    contributions.courses * 2 + 
    contributions.activities * 3 + 
    contributions.communities;
  
  let newLevel = 1;
  
  if (points >= 1000 && totalContributions >= 20) newLevel = 5;
  else if (points >= 500 && totalContributions >= 10) newLevel = 4;
  else if (points >= 200 && totalContributions >= 5) newLevel = 3;
  else if (points >= 50 && totalContributions >= 2) newLevel = 2;
  
  if (newLevel !== this.stats.level) {
    this.stats.level = newLevel;
    return true;
  }
  return false;
};

// 申请角色
userSchema.methods.applyForRole = function(roleData) {
  this.roleApplications.push({
    role: roleData.role,
    activityId: roleData.activityId,
    courseId: roleData.courseId,
    reason: roleData.reason
  });
};

// 获取用户当前可申请的角色
userSchema.methods.getAvailableRoles = function() {
  const roles = [];
  const { level, contributions } = this.stats;
  
  // 讲师角色
  if (level >= 2 && contributions.courses >= 1) {
    roles.push('instructor');
  }
  
  // 组织者角色
  if (level >= 3 && contributions.activities >= 2) {
    roles.push('organizer');
  }
  
  // 志愿者角色
  if (level >= 2) {
    roles.push('volunteer');
  }
  
  // 专家角色
  if (level >= 4 && 
      (contributions.courses >= 5 || 
       contributions.activities >= 5 || 
       contributions.communities >= 10)) {
    roles.push('expert');
  }
  
  return roles;
};

const User = mongoose.model('User', userSchema);

export default User; 