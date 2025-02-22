Feature: Password change

Given the User is logged in in the Account
And the Users current Password is "oldPassword"
And the User clicks on the Accout Icon
And the User clicks on "Change Password"
And the User types "oldPassword" into the "Old password" field
And the User types "newPassword" into the "New password" field
And the User types "newPassword" into the "Repeat new password" field
When the User clicks the "Save" Button
Then a success Message Popup appears with the Info "The Password change was successful"