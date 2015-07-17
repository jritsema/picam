picam
======

A camera solution for raspberry pi.

### What?

- a node server that 
  - serves up a react/bootstrap app 
  - allows user to remotely take photos or set an automatic interval or timer
  - displays photos
  - static file server that serves up photo image files

- add a camera widget to the family-dashboard

- setup `$ git push pi master`

- automatically start node server when pi starts

### tech stack

- node
- express
[get /photo] -> return image
[post /photo] -> take picture

- react
- react-bootstrap
- browserify