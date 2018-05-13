# AngularJS conditional templates

A multi-tenant application should provide the ability for one component to 
use different template files. 

## What options we have
AngularJS does not provides such functionality out of the box. It is possible 
to come up with a simple solution such as passing a function to templateUrl 
component configuration property or using a directive. In both cases there is 
no way to handle a "template file not exists" error. 

## Solution
The solution, demonstrated in this project, decorates the $templateRequest 
AngularJS service. The extra functionality is as follows (check app.js):

1. One of our custom AngularJS services performs a request to the project 
backend and retrieve some data - configuration object, user profile, etc. 
We already know one of the property will be used to load a custom template. 
2. The property value is injected into the template file name. 

    2.1. If the "injected" template file name exists in $templateCache, it will be used.

    2.2. If the "injected" template file name does not exists in $templateCache,
the original template file name will be used instead.

## Setup

```
npm install
bower install
gulp
```