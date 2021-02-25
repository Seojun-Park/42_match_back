export const typeDefs = ["type BlockUserResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype Mutation {\n  BlockUser(id: Int!): BlockUserResponse!\n  UnblockUser(id: Int!): UnblockUserResponse!\n  ReportUser(id: Int!, reason: String!): ReportUserResponse!\n  CreateTag(title: String!): CreateTagResponse!\n  AcceptLike(likeId: Int!): AcceptLikeResponse!\n  CancelLike(likeId: Int!): CancelLikeResponse!\n  CreateAccount(email: String!, username: String!, firstName: String!, lastName: String!, password: String!): CreateAccountResponse!\n  CreateProfile(gender: String!, age: Int!, profilePhoto: String!, images: [String], preference: [String], location: String!, intro: String!): CreateProfileResponse!\n  EditProfile(username: String!, firstName: String, lastName: String, profilePhoto: String, intro: String, gender: String, age: Int, preference: [String], location: String): EditProfileResponse!\n  RequestCode(email: String!): RequestCodeResponse!\n  SendingLike(id: Int!): SendingLikeResponse!\n  UserLogin(email: String!, password: String!): UserLoginResponse!\n  UserVerification(email: String!, code: String!): UserVerificationResponse!\n}\n\ntype Block {\n  owner: User!\n  ownerId: Int!\n  target: User!\n  createdAt: String\n}\n\ntype UnblockUserResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype ReportUserResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype Report {\n  id: Int!\n  reason: String!\n  target: User!\n  reporter: User!\n  createdAt: String\n}\n\ntype CreateTagResponse {\n  ok: Boolean!\n  err: String\n  tag: Tag\n}\n\ntype Tag {\n  id: Int!\n  title: String!\n  user: [User]!\n  userId: Int\n  createdAt: String\n}\n\ntype AcceptLikeResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype CancelLikeResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype CreateAccountResponse {\n  ok: Boolean!\n  err: String\n  token: String\n}\n\ntype CreateProfileResponse {\n  ok: Boolean!\n  err: String\n  user: User\n}\n\ntype EditProfileResponse {\n  ok: Boolean!\n  err: String\n  user: User\n}\n\ntype GetMeResponse {\n  ok: Boolean!\n  err: String\n  user: User\n}\n\ntype Query {\n  GetMe: GetMeResponse!\n  GetUser(id: Int!): GetUserResponse!\n  SearchUser(lat: Float, lng: Float, location: String): SearchUserReponse!\n  SearchUserByAge(age: Int!): SearchUserByAgeResponse!\n  users: [User]\n  ShowFameRanking: ShowFameRankingResponse!\n}\n\ntype GetUserResponse {\n  ok: Boolean!\n  err: String\n  user: User\n}\n\ntype RequestCodeResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype SearchUserReponse {\n  ok: Boolean!\n  err: String\n  users: [User]\n}\n\ntype SearchUserByAgeResponse {\n  ok: Boolean!\n  err: String\n  users: [User]\n}\n\ntype SendingLikeResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype Image {\n  id: Int!\n  user: User!\n  userId: Int\n  url: String!\n  createdAt: String\n}\n\ntype Like {\n  id: Int!\n  isMatch: Boolean!\n  status: String!\n  to: User!\n  from: User!\n  createdAt: String\n  updatedAt: String\n}\n\ntype User {\n  id: Int!\n  email: String!\n  password: String!\n  username: String!\n  firstName: String!\n  lastName: String!\n  profilePhoto: String\n  intro: String\n  gender: String\n  age: Int\n  preference: [String]\n  location: String\n  lastLat: Float\n  lastLng: Float\n  secretCode: String\n  images: [Image]\n  block: [Block]\n  tags: [Tag]\n  fameRating: Int\n  likeTo: [Like]\n  likeFrom: [Like]\n  isBlocked: Boolean!\n  isVerified: Boolean!\n  createdAt: String\n  updatedAt: String\n}\n\ntype ShowFameRankingResponse {\n  ok: Boolean!\n  err: String\n  users: [User]\n}\n\ntype UserLoginResponse {\n  ok: Boolean!\n  err: String\n  token: String\n}\n\ntype UserVerificationResponse {\n  ok: Boolean!\n  err: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetMe: GetMeResponse;
  GetUser: GetUserResponse;
  SearchUser: SearchUserReponse;
  SearchUserByAge: SearchUserByAgeResponse;
  users: Array<User> | null;
  ShowFameRanking: ShowFameRankingResponse;
}

export interface GetUserQueryArgs {
  id: number;
}

export interface SearchUserQueryArgs {
  lat: number | null;
  lng: number | null;
  location: string | null;
}

export interface SearchUserByAgeQueryArgs {
  age: number;
}

export interface GetMeResponse {
  ok: boolean;
  err: string | null;
  user: User | null;
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
  tags: Array<Tag> | null;
  fameRating: number | null;
  likeTo: Array<Like> | null;
  likeFrom: Array<Like> | null;
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
  owner: User;
  ownerId: number;
  target: User;
  createdAt: string | null;
}

export interface Tag {
  id: number;
  title: string;
  user: Array<User>;
  userId: number | null;
  createdAt: string | null;
}

export interface Like {
  id: number;
  isMatch: boolean;
  status: string;
  to: User;
  from: User;
  createdAt: string | null;
  updatedAt: string | null;
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

export interface SearchUserByAgeResponse {
  ok: boolean;
  err: string | null;
  users: Array<User> | null;
}

export interface ShowFameRankingResponse {
  ok: boolean;
  err: string | null;
  users: Array<User> | null;
}

export interface Mutation {
  BlockUser: BlockUserResponse;
  UnblockUser: UnblockUserResponse;
  ReportUser: ReportUserResponse;
  CreateTag: CreateTagResponse;
  AcceptLike: AcceptLikeResponse;
  CancelLike: CancelLikeResponse;
  CreateAccount: CreateAccountResponse;
  CreateProfile: CreateProfileResponse;
  EditProfile: EditProfileResponse;
  RequestCode: RequestCodeResponse;
  SendingLike: SendingLikeResponse;
  UserLogin: UserLoginResponse;
  UserVerification: UserVerificationResponse;
}

export interface BlockUserMutationArgs {
  id: number;
}

export interface UnblockUserMutationArgs {
  id: number;
}

export interface ReportUserMutationArgs {
  id: number;
  reason: string;
}

export interface CreateTagMutationArgs {
  title: string;
}

export interface AcceptLikeMutationArgs {
  likeId: number;
}

export interface CancelLikeMutationArgs {
  likeId: number;
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

export interface SendingLikeMutationArgs {
  id: number;
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

export interface UnblockUserResponse {
  ok: boolean;
  err: string | null;
}

export interface ReportUserResponse {
  ok: boolean;
  err: string | null;
}

export interface CreateTagResponse {
  ok: boolean;
  err: string | null;
  tag: Tag | null;
}

export interface AcceptLikeResponse {
  ok: boolean;
  err: string | null;
}

export interface CancelLikeResponse {
  ok: boolean;
  err: string | null;
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

export interface SendingLikeResponse {
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

export interface Report {
  id: number;
  reason: string;
  target: User;
  reporter: User;
  createdAt: string | null;
}
