# Repair notifications

This project is to demonstrate how car repair shops can send notifications to their customers about their car as it is
being repaired.

To view the demo website, go to [notify.repair](https://notify.repair)

If you visit the site from a mobile phone, you will see the customer view. If you turn your mobile landscape or visit
from an iPad or tablet, you will see the mechanic view. If you visit from a laptop/desktop computer, you will see both.

The customer view represents someone who is getting their car repaired, and wants to receive updates about the status of
their car.

The mechanic view represents a car mechanic who sends customers notifications about their car repair through an iPad
app.

## Client

The client is a React single page app. Source code is written in TypeScript and SASS and stored in `client/src`.

Output is compiled to ES5 in `client/public` which is deployed to Firebase Hosting.

## Server

The server side code is written in TypeScript in `server/src` and compiled to `server/lib` where it is deployed to
Firebase Functions. As of yet, there has been no need for server side functions to this is empty.

The system driving the notification is Firebase Realtime Database. 
