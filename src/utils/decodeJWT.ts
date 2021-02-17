import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../entities/User";

export const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN || "");
    const { id } = decoded;
    const user = await User.findOne({ id });
    return user;
  } catch (err) {
    return undefined;
  }
};

export const generateCode = () => {
  let randomNumber = Math.floor(Math.random() * 1000000);
  let result: string;
  if (randomNumber > 1000000) {
    randomNumber - 100000;
  }
  result = randomNumber.toString();
  return result;
};

const getTransporter = async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDR,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  return transporter;
};

export const sendMail = async (address: string, code: string) => {
  const transporter = await getTransporter();
  await transporter.sendMail({
    from: "jinpark@student.42.fr",
    to: address,
    subject: "Login Secret Number 🐴",
    html: `Hello! Your secret number is <h2>${code}</h2><br/>Copy paste the number on app to log in.`
  });
};

export const generateToken = (id) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ id }, secret as string, {
    expiresIn: 10080
  });
};