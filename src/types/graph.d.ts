export const typeDefs = ["type Tag {\n  id: Int!\n  title: String!\n  user: User!\n  userId: Int\n  createdAt: String\n}\n\ntype Follower {\n  id: Int!\n  user: User!\n  userId: Int\n  isLiked: Boolean\n  createdAt: String\n}\n\ntype Following {\n  id: Int!\n  user: User!\n  userId: Int\n  isLiked: Boolean\n  createdAt: String\n}\n\ntype Image {\n  id: Int!\n  user: User!\n  userId: Int\n  url: String!\n  createdAt: String\n}\n\ntype Report {\n  id: Int!\n  user: User!\n  userId: Int!\n  createdAt: String\n}\n\ntype User {\n  id: Int!\n  email: String!\n  password: String!\n  username: String!\n  firstName: String!\n  lastName: String!\n  intro: String!\n  gender: String!\n  age: Int!\n  location: String!\n  lastLat: Float\n  lastLng: Float\n  secretCode: String\n  images: [Image]\n  following: [Following]\n  followingcount: Int\n  follower: [Follower]\n  followercount: Int\n  tags: [Tag]\n  fameRating: Int\n  isMatch: Boolean!\n  isReported: [Report]\n  isBlocked: Boolean!\n  createdAt: String\n  updatedAt: String\n}\n\ntype Query {\n  users: [User]\n}\n"];
/* tslint:disable */

export interface Query {
  users: Array<User> | null;
}

export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  intro: string;
  gender: string;
  age: number;
  location: string;
  lastLat: number | null;
  lastLng: number | null;
  secretCode: string | null;
  images: Array<Image> | null;
  following: Array<Following> | null;
  followingcount: number | null;
  follower: Array<Follower> | null;
  followercount: number | null;
  tags: Array<Tag> | null;
  fameRating: number | null;
  isMatch: boolean;
  isReported: Array<Report> | null;
  isBlocked: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Image {
  id: number;
  user: User;
  userId: number | null;
  url: string;
  createdAt: string | null;
}

export interface Following {
  id: number;
  user: User;
  userId: number | null;
  isLiked: boolean | null;
  createdAt: string | null;
}

export interface Follower {
  id: number;
  user: User;
  userId: number | null;
  isLiked: boolean | null;
  createdAt: string | null;
}

export interface Tag {
  id: number;
  title: string;
  user: User;
  userId: number | null;
  createdAt: string | null;
}

export interface Report {
  id: number;
  user: User;
  userId: number;
  createdAt: string | null;
}
