export const typeDefs = ["type BlockUserResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype Mutation {\n  BlockUser(id: Int!): BlockUserResponse!\n  CreateTag(title: String!): CreateTagResponse!\n  CreateAccount(email: String!, username: String!, firstName: String!, lastName: String!, password: String!): CreateAccountResponse!\n  CreateProfile(gender: String!, age: Int!, profilePhoto: String!, images: [String], preference: [String], location: String!, intro: String!): CreateProfileResponse!\n  EditProfile(username: String!, firstName: String, lastName: String, profilePhoto: String, intro: String, gender: String, age: Int, preference: [String], location: String): EditProfileResponse!\n  RequestCode(email: String!): RequestCodeResponse!\n  UserLogin(email: String!, password: String!): UserLoginResponse!\n  UserVerification(email: String!, code: String!): UserVerificationResponse!\n}\n\ntype Block {\n  user: User!\n  userId: Int!\n  createdAt: String\n}\n\ntype CreateTagResponse {\n  ok: Boolean!\n  err: String\n  tag: Tag\n}\n\ntype Tag {\n  id: Int!\n  title: String!\n  user: [User]!\n  userId: Int\n  createdAt: String\n}\n\ntype CreateAccountResponse {\n  ok: Boolean!\n  err: String\n  token: String\n}\n\ntype CreateProfileResponse {\n  ok: Boolean!\n  err: String\n  user: User\n}\n\ntype EditProfileResponse {\n  ok: Boolean!\n  err: String\n  user: User\n}\n\ntype GetFollowingResponse {\n  ok: Boolean!\n  err: String\n  following: [Following]\n}\n\ntype Query {\n  GetFollowing(id: Int!): GetFollowingResponse!\n  GetMe: GetMeResponse!\n  GetUser(id: Int!): GetUserResponse!\n  SearchUser(lat: Float, lng: Float, location: String): SearchUserReponse!\n  users: [User]\n}\n\ntype GetMeResponse {\n  ok: Boolean!\n  err: String\n  user: User\n}\n\ntype GetUserResponse {\n  ok: Boolean!\n  err: String\n  user: User\n}\n\ntype RequestCodeResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype SearchUserReponse {\n  ok: Boolean!\n  err: String\n  users: [User]\n}\n\ntype Follower {\n  id: Int!\n  user: User!\n  userId: Int\n  isLiked: Boolean\n  createdAt: String\n}\n\ntype Following {\n  id: Int!\n  user: User!\n  userId: Int\n  isLiked: Boolean\n  createdAt: String\n}\n\ntype Image {\n  id: Int!\n  user: User!\n  userId: Int\n  url: String!\n  createdAt: String\n}\n\ntype Report {\n  id: Int!\n  user: User!\n  userId: Int!\n  createdAt: String\n}\n\ntype User {\n  id: Int!\n  email: String!\n  password: String!\n  username: String!\n  firstName: String!\n  lastName: String!\n  profilePhoto: String\n  intro: String\n  gender: String\n  age: Int\n  preference: [String]\n  location: String\n  lastLat: Float\n  lastLng: Float\n  secretCode: String\n  images: [Image]\n  block: [Block]\n  following: [Following]\n  followingcount: Int\n  follower: [Follower]\n  followercount: Int\n  tags: [Tag]\n  fameRating: Int\n  isReported: [Report]\n  isBlocked: Boolean!\n  isVerified: Boolean!\n  createdAt: String\n  updatedAt: String\n}\n\ntype UserLoginResponse {\n  ok: Boolean!\n  err: String\n  token: String\n}\n\ntype UserVerificationResponse {\n  ok: Boolean!\n  err: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetFollowing: GetFollowingResponse;
  GetMe: GetMeResponse;
  GetUser: GetUserResponse;
  SearchUser: SearchUserReponse;
  users: Array<User> | null;
}

export interface GetFollowingQueryArgs {
  id: number;
}

export interface GetUserQueryArgs {
  id: number;
}

export interface SearchUserQueryArgs {
  lat: number | null;
  lng: number | null;
  location: string | null;
}

export interface GetFollowingResponse {
  ok: boolean;
  err: string | null;
  following: Array<Following> | null;
}

export interface Following {
  id: number;
  user: User;
  userId: number | null;
  isLiked: boolean | null;
  createdAt: string | null;
}

export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePhoto: string | null;
  intro: string | null;
  gender: string | null;
  age: number | null;
  preference: Array<string> | null;
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
  user: Array<User>;
  userId: number | null;
  createdAt: string | null;
}

export interface Report {
  id: number;
  user: User;
  userId: number;
  createdAt: string | null;
}

export interface GetMeResponse {
  ok: boolean;
  err: string | null;
  user: User | null;
}

export interface GetUserResponse {
  ok: boolean;
  err: string | null;
  user: User | null;
}

export interface SearchUserReponse {
  ok: boolean;
  err: string | null;
  users: Array<User> | null;
}

export interface Mutation {
  BlockUser: BlockUserResponse;
  CreateTag: CreateTagResponse;
  CreateAccount: CreateAccountResponse;
  CreateProfile: CreateProfileResponse;
  EditProfile: EditProfileResponse;
  RequestCode: RequestCodeResponse;
  UserLogin: UserLoginResponse;
  UserVerification: UserVerificationResponse;
}

export interface BlockUserMutationArgs {
  id: number;
}

export interface CreateTagMutationArgs {
  title: string;
}

export interface CreateAccountMutationArgs {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface CreateProfileMutationArgs {
  gender: string;
  age: number;
  profilePhoto: string;
  images: Array<string> | null;
  preference: Array<string> | null;
  location: string;
  intro: string;
}

export interface EditProfileMutationArgs {
  username: string;
  firstName: string | null;
  lastName: string | null;
  profilePhoto: string | null;
  intro: string | null;
  gender: string | null;
  age: number | null;
  preference: Array<string> | null;
  location: string | null;
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

export interface BlockUserResponse {
  ok: boolean;
  err: string | null;
}

export interface CreateTagResponse {
  ok: boolean;
  err: string | null;
  tag: Tag | null;
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

export interface EditProfileResponse {
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
