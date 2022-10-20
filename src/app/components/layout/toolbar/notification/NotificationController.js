export default class NotificationController{
    constructor(){
        this.readNotifications();
    }
    
    readNotifications(){
        
        this.Notifications = [{
            "Name": "Notification 1",
            "Content": "This is notification 1",
            "Requester": "Alex Ilies"
        },
        {
            "Name": "Notification 2",
            "Content": "This is notification 2",
            "Requester": "Alex Moraru"
        },
        {
            "Name": "Notification 3",
            "Content": "This is notification 3",
            "Requester": "Alex Ilies"
        }];
        
        var notificationNumber = 10;
        
        this.IsNotificationNumberHidden = false;
        
        if (notificationNumber <= 0)
        {
            this.IsNotificationNumberHidden = true;
            this.NotificationsNumber = 0;
        }
        else if (notificationNumber > 9)
        {
            this.NotificationsNumber = "9+";
        }
        else
        {
            this.NotificationsNumber = notificationNumber;            
        }
    }

    showNotificationsMenu($mdOpenMenu, $event){
        $mdOpenMenu($event);
    }
}