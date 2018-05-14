# AngularJS component communucation

Example of nested components communication (data share between components).

## pass by reference
User addresses are passed by reference to **address-component**. Any changes 
will reflect in the **$ctrl.user.addresses** property. Deleting an address is 
implemented with event, emitted from **address-component** and is handled in 
**profile-component**. When navigating outside the profile-component, event 
listener will be unsubscribed.

## two-way data binding
In **repos-component**, user object is passed by two-way data binding. Any data, 
loaded asynchronous and assigned to the **$ctrl.user** object, will be available 
in **profile-component**. No event listeners are required in this case. All operations 
(add, edit, delete) are performed on **repos-component** level.

## Setup

```
npm install
bower install
gulp
```
