# Service Rocket: Space Map
This project is a Software Development Studio assignment, in which our group created an application that visually and hierarchically represents pages within confluence spaces. The application also enables the user to make updates to the pages via drag&drop and double clicking on nodes. The data is fetched from the [confluence api](https://developer.atlassian.com/cloud/confluence/rest/v1/intro/).

## Tech Stack

- Hosting and Deployment: [Forge](https://developer.atlassian.com/platform/forge/)
- UI Framework/Library: [React](https://reactjs.org/)
- Rendering Library for interactive nodes: [React Flow](https://reactflow.dev/)

## Unique Selling Points

- Visual overview of pages
- Minimalistic / Approachable UI/UX design
- Drag and Drop
- Undo *(Algorithm created purely through our own approach. Using a custom stack data structure that pushes successful update events such as title changes and page moves. Pops them from the stack, and executes them in reverse when the user presses the undo button)*
- "Bubblewrapped" user interaction (nothing can go wrong)
- Tutorial / On-boarding

## Roadmap and Possible Improvements

- Adding full CRUD functionality (creating and deleting new nodes, with added undo functionality)
- Navigating to pages
- More page information accessible in nodes such as comments
- Optimising tree updates (making them before response has arrive from server, using loading spinners to indicate incomplete update)
- Searching and filtering among nodes
- Centering nodes on layout and space changes
- Vertical (height) responsiveness

## Group Members

- **Marcell Munnich** *Team leader and lead developer*
- **Avishti Sharma** *SCRUM master*
-  **Trang Thi Le** *Business analyst*
- **Xin Chen** *Software Developer*
- **Xinlei hu** *Software Developer*
- **Phuong Anh Dang** *Business analyst*
- **Anton Horlanchuk** *Jack of all trades*

## Code Contributions

The following (3) members have contributed the following features to the application:

### Marcell
- Forge deployment and installation configuration
- Fetching and rendering pages as a tree
- Moving pages via drag and drop
- Title change via double click
- Undo
- Alerts (for unintended user actions)
- Loading Spinner
- Forge API calls and backend functions for other contributor's features
- Styling (minor changes)

### Ryan (Xin) and Colin (Xinlei)
- Space selection drop-down and filter
- Styling (majority)
- Responsiveness (app width)
- UI bug fixes

