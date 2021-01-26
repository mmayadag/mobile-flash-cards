import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'FlashCardsQuiz:notifications';

export function getDailyReminderValue() {
  return {
    today: "👋 Don't forget to complete your quiz today!",
  };
}

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return todayUTC.toISOString().split('T')[0];
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
  return {
    title: 'Lets Start a quiz!',
    body:
      "👋 Don't forget to complete your quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      sticky: false,
      priority: 'high',
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(
          ({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              const tomorrow = new Date();

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow.getTime() + 6000,
                  repeat: 'minute',
                },
              );
              AsyncStorage.setItem(
                NOTIFICATION_KEY,
                JSON.stringify(true),
              );
            }
          },
        );
      }
    });
}
