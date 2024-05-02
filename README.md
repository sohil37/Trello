## Documentation detailing the design approach and choices used to make Trello app.

### Choices:

**Project Build Tool** -

- [Vite](https://vitejs.dev/ "Vite") - It is used due to its simplified and quick project creation feature and fast development server.

**UI Library** -

- [Material UI](https://mui.com/ "Material UI") - Material UI library for react is used due to its vast range of material designed components, icons and rich developer experience.
- [React-Beautiful-DnD](https://www.npmjs.com/package/react-beautiful-dnd "React-Beautiful-DnD") - It is used to add drag and drop functionality to a card.

**Data Storage** -

- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage "LocalStorage") - Browser's local storage is used to preserve the application/card's data on refresh.

**State Management** -

- [React Redux Toolkit](https://redux-toolkit.js.org/ "React Redux Toolkit") - It is used due to its simplified implementation of Redux State Management in our app.
- Redux - Redux State management is used to manage UI and Data state of our application.

---

### Design Approach:

#### **Project Structure**

- src/**components** - /components folder contains all the components in our app.
- src/**config** - /config folder contains all the config files of our app.
- src/**redux** - /redux folder contains the reducers and stores in our app.
- src/**types** - /types folder contains all the Typescript Type files in our app.
- **App.tsx** - It is the root component and imports all the necessary components like `<Navbar>`, `<AppBody>` and `<AddCardModal>` to render our app.

#### **Components**

- A component contains Typescript-based JSX component file and may contain a css module file for the component. These 2 files are wrapped inside a folder with the same name as the component name.
- All the component are present inside the _src/components_ folder.
- Below are all the components used in our app:
  - **Navbar** - It is the `<Navbar>` component and contains "Navbar Title" and "Add New Card" button.
  - **AppBody** - It is the `<Body>` component and contains all the columns.
  - **Column** - It is the `<Column>` component and contains all the cards for each column.
  - **CustomCard** - It is the `<Card>` component and contains "Title", "Description" and "Column Name" of the card.
  - **AddCardModal** - It is the `<Modal>` component that allows to "add" new card and "edit" existing card in our app.

#### **Redux**

- **Store** - It contains state for the whole app including [app data / card data] and ui state.
  - **appData** - It contains cards data for each column.
  - **uiState** - It contains `<AddCardModal>` component's state and each columns background colour.
- **Reducer Actions** - It contains below actions to perform necessary modification on the state present in the store.
  - **addCard** - This action adds new card in the browser's localStorage and updates the state with the same data stored in the browser's localStorage.
  - **updateCard** - This action updates a card in the browser's localStorage and updates the state with the same data updated in the browser's localStorage.
  - **deleteCard** - This action deletes a card from the browser's localStorage and updates the state with the same data updated in the browser's localStorage.
  - **showAddCardModal** - This action shows the `<AddCardModal>` component with "add card" or "edit card" mode.
  - **closeAddCardModal** - This action closes the `<AddCardModal>` component.
  - **changeColumnBg** - This action changes the background colour for a given column.

#### **Working**

1.  **State Initialization** -

    - **First load** - If the app is opened on a client's device for the first time, the browser's localStorage will not contain any data and hence, the state of the app will be initialized with an empty list of card data for each column.
    - **Existing Data** - If the browser's localStorage contains app data, then it will be fetched and the application's state will get initialized with the fetched data.

1.  **Adding a Card** -

    - To add a card, user will click on the "Add New Card" button on the `<Navbar>`.
    - The "showAddCardModal" dispatcher action with purpose "add" will get called and the `<AddCardModal>` will open.
    - The user will than fill the "Title" and "Description" field and select a "Column" in which the user may want to add the card and than he click on submit.
    - After submission, the data for "Title", "Description" and "Column" field will be validated and a dispatcher action "addCard" will get called.
    - Once the data gets stored in the browser's localStorage and the application's state gets updated, the "closeAddCardModal" dispatcher action will get called to close the modal.

1.  **Updating a Card** -

    - To update a card, user will click on the card he wish to edit.
    - The "showAddCardModal" dispatcher action with purpose "edit" will get called and the `<AddCardModal>` will open.
    - The fields in the `<AddCardModal>` will be prefilled with the card's data.
    - The user will than edit the "Title", "Description" and "Column" fields and click on submit.
    - After submission, the data for the "Title", "Description" and "Column" field will be validated and a dispatcher action "updateCard" will get called.
    - Once the data gets stored in the browser's localStorage and the application's state gets updated, the "closeAddCardModal" dispatcher action will get called to close the modal.

1.  **Deleting a Card** -

    - To delete a card, user will click on the card he wish to delete.
    - The "showAddCardModal" dispatcher action with purpose "edit" will get called and the `<AddCardModal>` will open.
    - The fields in the `<AddCardModal>` will be prefilled with the card's data.
    - The user will than click on the "Delete" button and a dispatcher action "deleteCard" will get called.
    - Once the data gets updated in the browser's localStorage and the application's state, the "closeAddCardModal" dispatcher action will get called to close the modal.

1.  **Moving a Card** -
    - To move a card, user will click a card and drag it to a particular column.
    - Once the user ends the drag, "updateCard" dispatcher action gets called to update the application data in the browser's localStorage and in the application's state, with the updated column info.
