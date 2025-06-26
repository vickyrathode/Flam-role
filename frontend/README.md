## How It Works

### Overview
This Event Calendar app is a modern, interactive calendar for managing events and tasks. It features:
- A monthly calendar view in the center
- A left panel for all pending (incomplete) events
- A right panel for all completed events
- A sticky navbar with a logo and title

### Key Features
- **Add Event:** Click any day in the calendar or use the left panel to add a new event. Fill in the details and save.
- **Edit/Complete Event:** Click an event in the left panel to reveal Edit and Complete buttons. Edit opens the form; Complete moves the event to the right panel.
- **Drag & Drop:** Drag events on the calendar to reschedule them to another day.
- **Recurring Events:** Supports daily, weekly, and monthly recurring events.
- **Persistence:** All events are saved in your browser's local storage. Your data remains after reloads or browser restarts.
- **Responsive Layout:** The app uses a 25%/50%/25% layout for left, center, and right panels, filling the whole screen.

### Data Storage
- All events are stored as a single array in local storage under the key `calendar-events`.
- Any add, edit, complete, or delete action updates local storage immediately.

### Usage
1. **Add an Event:** Click a day or use the left panel, fill the form, and save.
2. **Edit/Complete:** Click an event in the left panel, then choose Edit or Complete.
3. **View Completed:** Completed events appear in the right panel.
4. **Persistence:** Refresh or close/reopen the browser—your events remain.

## How to Use / Run

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Open the app:**
   - Visit the local address shown in your terminal (usually http://localhost:5173) in your browser.

4. **Build for production:**
   ```sh
   npm run build
   ```
   The production-ready files will be in the `dist` folder.

5. **Preview the production build:**
   ```sh
   npm run preview
   ```
