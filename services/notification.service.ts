import axios from "axios";
import prisma from "./prismaClient.service";

export interface NotificationMessage {
  title: string;
  body: string;
  data?: object;
}

class NotificationService {
  static async sendToAllUsers(message: NotificationMessage): Promise<void> {
    const allTokens = await prisma.pushToken.findMany();
    allTokens.forEach(async (token) => {
      await this.sendPushNotification(token.token, message);
    });
  }

  static async sendToUser(
    userId: number,
    message: NotificationMessage,
  ): Promise<void> {
    const userTokens = await prisma.pushToken.findMany({
      where: {
        userId,
      },
    })
    if (userTokens != null && userTokens.length > 0) {
      userTokens.forEach(async (token) => {
        await this.sendPushNotification(token.token, message);
      });
    }
  }

  private static async sendPushNotification(
    token: string,
    message: NotificationMessage,
  ): Promise<void> {
    try {
      await axios.post("https://exp.host/--/api/v2/push/send", {
        to: token,
        title: message.title,
        body: message.body,
        data: message.data,
      });
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  }
}

export default NotificationService;
export async function registerDeviceToken(
  userId: number,
  deviceToken: string,
): Promise<boolean> {
  try {
    const existingTokens = await prisma.pushToken.findMany({
      where: {
        userId: userId,
      },
    });

    if (existingTokens && existingTokens.length > 0) {
      await Promise.all(
        existingTokens.map((token) =>
          prisma.pushToken.update({
            where: {
              id: token.id,
            },
            data: {
              token: deviceToken,
            },
          }),
        ),
      )
    } else {
      await prisma.pushToken.create({
        data: {
          userId: userId,
          token: deviceToken,
        },
      });
    }

    return true;
  } catch (error) {
    console.error("Error registering device token:", error);
    return false;
  }
}
