export const typeDefs = ["type Tag {\n  id: Int!\n  title: String!\n  user: User!\n  userId: Int\n  createdAt: String\n}\n\ntype CreateAccountResponse {\n  ok: Boolean!\n  err: String\n  token: String\n}\n\ntype Mutation {\n  CreateAccount(email: String!, username: String!, firstName: String!, lastName: String!, password: String!): CreateAccountResponse!\n  CreateProfile(id: Int!, gender: String!, age: Int!, profilePhoto: String!, images: [String], preference: [String], location: String!, intro: String!): CreateProfileResponse!\n  RequestCode(email: String!): RequestCodeResponse!\n  UserLogin(email: String!, password: String!): UserLoginResponse!\n  UserVerification(email: String!, code: String!): UserVerificationResponse!\n}\n\ntype CreateProfileResponse {\n  ok: Boolean!\n  err: String\n  user: User\n}\n\ntype RequestCodeResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype Block {\n  user: User!\n  userId: Int!\n  createdAt: String\n}\n\ntype Follower {\n  id: Int!\n  user: User!\n  userId: Int\n  isLiked: Boolean\n  createdAt: String\n}\n\ntype Following {\n  id: Int!\n  user: User!\n  userId: Int\n  isLiked: Boolean\n  createdAt: String\n}\n\ntype Image {\n  id: Int!\n  user: User!\n  userId: Int\n  url: String!\n  createdAt: String\n}\n\ntype Report {\n  id: Int!\n  user: User!\n  userId: Int!\n  createdAt: String\n}\n\ntype User {\n  id: Int!\n  email: String!\n  password: String!\n  username: String!\n  firstName: String!\n  lastName: String!\n  intro: String\n  gender: String\n  age: Int\n  location: String\n  lastLat: Float\n  lastLng: Float\n  secretCode: String\n  images: [Image]\n  block: [Block]\n  following: [Following]\n  followingcount: Int\n  follower: [Follower]\n  followercount: Int\n  tags: [Tag]\n  fameRating: Int\n  isReported: [Report]\n  isBlocked: Boolean!\n  isVerified: Boolean!\n  createdAt: String\n  updatedAt: String\n}\n\ntype Query {\n  users: [User]\n}\n\ntype UserLoginResponse {\n  ok: Boolean!\n  err: String\n  token: String\n}\n\ntype UserVerificationResponse {\n  ok: Boolean!\n  err: String\n}\n"];
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
  intro: string | null;
  gender: string | null;
  age: number | null;
  location: string | null;
  lastLat: number | null;
  lastLng: number | null;
  secretCode: string | null;
  images: Array<Image> | null;
  block: Array<Block> | null;
  following: Array<Following> | null;
  followingcount: number | null;
  follower: Array<Follower> | null;
  followercount: number | null;
  tags: Array<Tag> | null;
  fameRating: number | null;
  isReported: Array<Report> | null;
  isBlocked: boolean;
  isVerified: boolean;
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

export interface Block {
  user: User;
  userId: number;
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

export interface Mutation {
  CreateAccount: CreateAccountResponse;
  CreateProfile: CreateProfileResponse;
  RequestCode: RequestCodeResponse;
  UserLogin: UserLoginResponse;
  UserVerification: UserVerificationResponse;
}

export interface CreateAccountMutationArgs {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface CreateProfileMutationArgs {
  id: number;
  gender: string;
  age: number;
  profilePhoto: string;
  images: Array<string> | null;
  preference: Array<string> | null;
  location: string;
  intro: string;
}

export interface RequestCodeMutationArgs {
  email: string;
}

export interface UserLoginMutationArgs {
  email: string;
  password: string;
}

export interface UserVerificationMutationArgs {
  email: string;
  code: string;
}

export interface CreateAccountResponse {
  ok: boolean;
  err: string | null;
  token: string | null;
}

export interface CreateProfileResponse {
  ok: boolean;
  err: string | null;
  user: User | null;
}

export interface RequestCodeResponse {
  ok: boolean;
  err: string | null;
}

export interface UserLoginResponse {
  ok: boolean;
  err: string | null;
  token: string | null;
}

export interface UserVerificationResponse {
  ok: boolean;
  err: string | null;
}
