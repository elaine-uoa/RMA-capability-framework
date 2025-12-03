# Data Storage & Saving Mechanism

## How Data is Saved

### Current Implementation: **Auto-Save with Visual Feedback**

The application uses an **automatic save system** that saves your data without requiring you to click a "Save" button. Here's how it works:

---

## 🔄 Auto-Save Process

### 1. **When You Make Changes**
Every time you:
- ✅ Select a current level
- ✅ Select a target/desired level  
- ✅ Check/uncheck focus area boxes
- ✅ Type in the notes field

The system automatically detects the change.

### 2. **Debounced Save (300ms delay)**
- Changes are saved **300 milliseconds** after you stop typing/clicking
- This prevents excessive saves while you're actively working
- Example: If you type "Hello world", it waits until you pause for 300ms, then saves

### 3. **Storage Location**
- Data is saved to **browser localStorage**
- Storage key: `"rma-assessment-state"`
- Persists across page refreshes and browser sessions

### 4. **What Gets Saved**
For each capability, the system saves:
```typescript
{
  capabilityId: "research-engagement",
  currentLevel: "FOUNDATION",
  desiredLevel: "INTERMEDIATE", 
  notes: "My development notes...",
  focusAreas: [
    { level: "FOUNDATION", descriptorIndex: 0 },
    { level: "INTERMEDIATE", descriptorIndex: 2 }
  ]
}
```

---

## 👁️ Visual Save Indicators

### Three Save States:

1. **"Saving..."** (Blue spinner)
   - Shows when changes are being saved
   - Appears immediately when you make changes

2. **"Saved"** (Green checkmark)
   - Confirms your data has been saved
   - Appears for 2 seconds after save completes

3. **"Auto-saved"** (Gray checkmark)
   - Default state when no recent changes
   - Indicates your data is safely stored

### Manual Save Button
- **"Save Now"** button available
- Click to force immediate save (no waiting)
- Useful if you want explicit confirmation

---

## 🔄 How to Return and Modify

### You Can Always Come Back:

1. **Navigate to Any Capability**
   - Go to homepage → Click any capability card
   - Or use "Jump to Capability" dropdown

2. **Your Data Loads Automatically**
   - All your previous selections are restored
   - Current level, target level, notes, focus areas
   - Everything is exactly as you left it

3. **Make Changes**
   - Update your current level
   - Change focus areas
   - Edit notes
   - All changes auto-save

4. **No Data Loss**
   - Data persists even if you:
     - Close the browser
     - Refresh the page
     - Navigate away and come back
     - Switch between capabilities

---

## 📊 Data Flow Diagram

```
User Action (Select level, type notes, check boxes)
    ↓
State Updates (React state changes)
    ↓
useEffect Detects Change (after 300ms debounce)
    ↓
updateResponse() Called
    ↓
AssessmentContext Updates
    ↓
localStorage.setItem() (Saves to browser)
    ↓
Visual Indicator Shows "Saved" ✓
```

---

## 🎯 Per-Capability Saving

### Each Capability is Saved Independently:

- **Research-related Engagement** → Saved separately
- **Maximising Impact** → Saved separately  
- **Researcher Development** → Saved separately
- ... and so on for all 10 capabilities

### You Can:
- ✅ Assess one capability and leave
- ✅ Come back later to assess another
- ✅ Update any capability anytime
- ✅ Each capability's data is independent

---

## 💾 Storage Details

### Browser localStorage:
- **Location**: Browser's local storage (per domain)
- **Capacity**: ~5-10MB (plenty for this app)
- **Persistence**: Until you clear browser data or use "Clear" button
- **Privacy**: Data never leaves your browser

### What Happens on Different Devices:
- ❌ **Different computer**: Data not available (localStorage is per-device)
- ❌ **Different browser**: Data not available (localStorage is per-browser)
- ✅ **Same browser/device**: Data persists forever (until cleared)

---

## 🔧 Technical Implementation

### Auto-Save Code Flow:

1. **Assessment Page** (`app/assess/page.tsx`)
   ```typescript
   // User makes change → State updates
   setCurrentLevel("INTERMEDIATE")
   
   // useEffect detects change after 300ms
   useEffect(() => {
     updateResponse(capabilityId, { currentLevel, ... });
   }, [currentLevel, ...]);
   ```

2. **Context Provider** (`contexts/AssessmentContext.tsx`)
   ```typescript
   // Updates global state
   updateResponse() → setAssessmentState()
   
   // Auto-saves to localStorage
   useEffect(() => {
     localStorage.setItem(STORAGE_KEY, JSON.stringify(assessmentState));
   }, [assessmentState]);
   ```

3. **localStorage**
   - Browser automatically persists the data
   - Available on next page load

---

## ✅ Benefits of Auto-Save

1. **No Data Loss**
   - Can't forget to save
   - Works even if browser crashes

2. **Seamless Experience**
   - No interruption to workflow
   - Focus on assessment, not saving

3. **Always Up-to-Date**
   - Latest changes always saved
   - Can navigate away safely

4. **User-Friendly**
   - Visual feedback confirms saves
   - Manual save button available if needed

---

## 🎨 User Experience

### What Users See:

1. **Making Changes:**
   - Select level → "Saving..." appears
   - After 300ms → "Saved" with checkmark
   - After 2 seconds → "Auto-saved" (default state)

2. **Manual Save:**
   - Click "Save Now" → Immediate save
   - "Saved" confirmation appears

3. **Returning Later:**
   - Navigate to capability
   - All previous data loads automatically
   - Continue where you left off

---

## 📝 Summary

- ✅ **Auto-saves** after 300ms of inactivity
- ✅ **Visual indicators** show save status
- ✅ **Manual save button** available
- ✅ **Per-capability** independent saving
- ✅ **Persists** across sessions
- ✅ **Can return** anytime to modify
- ✅ **No data loss** risk

**Bottom Line:** Your data is automatically saved as you work. You can always return to any capability page to view or update your assessment.

