import Activity from '../models/Activity.js';
import User from '../models/User.js';

// 创建活动
export const createActivity = async (req, res) => {
  try {
    const activity = new Activity({
      ...req.body,
      organizer: req.user.userId
    });

    await activity.save();

    // 更新组织者的活动统计
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { 'stats.activitiesOrganized': 1 }
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 获取活动列表
export const getActivities = async (req, res) => {
  try {
    const { type, category, status } = req.query;
    const query = {};

    if (type) query.type = type;
    if (category) query.category = category;
    if (status) query.status = status;

    const activities = await Activity.find(query)
      .populate('organizer', 'username avatar profile.nickname')
      .populate('instructors', 'username avatar profile.nickname')
      .sort({ startTime: 1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 获取活动详情
export const getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id)
      .populate('organizer', 'username avatar profile.nickname')
      .populate('instructors', 'username avatar profile.nickname')
      .populate('participants.user', 'username avatar profile.nickname');

    if (!activity) {
      return res.status(404).json({ message: '活动不存在' });
    }

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 更新活动
export const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: '活动不存在' });
    }

    // 检查是否是组织者
    if (activity.organizer.toString() !== req.user.userId) {
      return res.status(403).json({ message: '无权修改此活动' });
    }

    Object.assign(activity, req.body);
    activity.updatedAt = new Date();
    await activity.save();

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 审核活动参与者
export const reviewParticipant = async (req, res) => {
  try {
    const { activityId, userId, status } = req.body;
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ message: '活动不存在' });
    }

    // 检查是否是组织者
    if (activity.organizer.toString() !== req.user.userId) {
      return res.status(403).json({ message: '无权审核此活动' });
    }

    // 更新参与者状态
    const participant = activity.participants.find(
      p => p.user.toString() === userId
    );

    if (!participant) {
      return res.status(404).json({ message: '参与者不存在' });
    }

    participant.status = status;
    await activity.save();

    // 更新用户活动状态
    const user = await User.findById(userId);
    const userActivity = user.activities.find(
      a => a.activityId.toString() === activityId
    );

    if (userActivity) {
      userActivity.status = status;
      await user.save();
    }

    res.json({ message: '审核完成' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 完成活动
export const completeActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: '活动不存在' });
    }

    // 检查是否是组织者
    if (activity.organizer.toString() !== req.user.userId) {
      return res.status(403).json({ message: '无权完成此活动' });
    }

    // 更新活动状态
    activity.status = 'completed';
    await activity.save();

    // 更新参与者统计
    const participants = activity.participants.filter(
      p => p.status === 'attended'
    );

    for (const participant of participants) {
      await User.findByIdAndUpdate(participant.user, {
        $inc: {
          'stats.eventsAttended': 1,
          'stats.points': activity.points
        }
      });
    }

    res.json({ message: '活动已完成' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 