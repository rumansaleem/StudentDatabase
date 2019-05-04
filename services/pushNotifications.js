import { PushNotificationIOS } from 'react-native';
import PushNotification from 'react-native-push-notification';
import db from '../database/SQLiteDB';

export const configure = () => {
  PushNotification.configure({
  
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
  
    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
  
      // process the notification
  
      // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
  });
  console.log('configured');
}

export const sendCountNotification = async () => {
  await db.executeSql(
    'SELECT COUNT(*) as count FROM students', 
    [], 
    (res) => {
      const {count} = res.rows.item(0)
      PushNotification.localNotificationSchedule({
        id: '101',
        title: "Sudent Database",
        message: `Student count is ${count}`,
        date: new Date(Date.now() + 2000),
        repeatType: 'time',
        repeatTime: 5 * 60 * 1000, //5 Mins
      });
    }
  );
}

export default {
  configure,
  sendCountNotification
}