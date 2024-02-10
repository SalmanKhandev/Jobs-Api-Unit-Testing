import { registerUser } from "./authController";
import bcrypt from "bcryptjs";
import User from "../models/users";

jest.mock("../utils/helpers", () => ({
  getJwtToken: jest.fn(() => "jwt_token"),
}));

const mockRequest = () => {
  return {
    body: {
      name: "test",
      email: "test@gmail.com",
      password: "123456789",
    },
  };
};

const mockResponse = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
};

const mockUser = {
  _id: "343kajsdl4433kljlasdfasdfa",
  name: "test",
  email: "test@gmail.com",
  password: "hashedPassword",
};

describe("Register User", () => {
  it("should register a user", async () => {
    jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("hashedPassword");
    jest.spyOn(User, "create").mockResolvedValueOnce(mockUser);

    const mockReq = mockRequest();
    const mockRes = mockResponse();

    console.log(mockReq, mockRes);

    await registerUser(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(bcrypt.hash).toHaveBeenCalledWith("123456789", 10);
    expect(User.create).toHaveBeenCalledWith({
      name: "test",
      email: "test@gmail.com",
      password: "hashedPassword",
    });
  });
});
