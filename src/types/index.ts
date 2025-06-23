
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'teacher' | 'student';
  avatar?: string;
  createdAt: Date;
}

export interface Classroom {
  id: string;
  name: string;
  description: string;
  teacherId: string;
  joinCode: string;
  createdAt: Date;
  students: StudentInClass[];
}

export interface StudentInClass {
  userId: string;
  user: User;
  classroomId: string;
  character: Character;
  stats: StudentStats;
  joinedAt: Date;
}

export interface Character {
  id: string;
  type: 'mage' | 'warrior' | 'healer';
  level: number;
  powers: Power[];
  items: Item[];
}

export interface Power {
  id: string;
  name: string;
  description: string;
  apCost: number;
  cooldown: number;
  characterType: 'mage' | 'warrior' | 'healer';
  effect: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'weapon' | 'armor' | 'accessory' | 'cosmetic';
  characterType?: 'mage' | 'warrior' | 'healer';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface StudentStats {
  xp: number;
  level: number;
  coins: number;
  ap: number;
  maxAp: number;
  health: number;
  maxHealth: number;
  isAlive: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  classroomId: string;
  dueDate: Date;
  xpReward: number;
  coinReward: number;
  completed: boolean;
  studentId?: string;
  groupId?: string;
  createdAt: Date;
}

export interface Group {
  id: string;
  name: string;
  classroomId: string;
  members: StudentInClass[];
  stats: {
    totalXp: number;
    totalCoins: number;
    averageLevel: number;
  };
  createdAt: Date;
}

export interface RandomEvent {
  id: string;
  title: string;
  description: string;
  effect: 'positive' | 'negative';
  targetType: 'individual' | 'group' | 'class';
  rewards?: {
    xp?: number;
    coins?: number;
    ap?: number;
    health?: number;
  };
}
