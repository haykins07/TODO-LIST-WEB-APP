Test Cases for To-Do List Web App

TC-01: Task Input Form
Scenario: Verify adding a task with valid inputs.
Test Steps:
Enter a valid task title, description, due date, and priority.
Click the Add Task button.
Expected Result: The new task appears in the Task List with the correct details.

TC-02: Task Input Form
Scenario: Verify adding a task without a title.
Test Steps:
Leave the title field empty, but enter a due date, description, and priority.
Click the Add Task button.
Expected Result: A validation error appears, preventing task addition if the title is empty.

TC-03: Task Input Form
Scenario: Verify adding a task without a description.
Test Steps:
Enter task title, due date, and priority, leaving the description empty.
Click the Add Task button.
Expected Result: The task is added to the Task List without a description.

TC-04: Task List
Scenario: Verify deletion of an existing task.
Test Steps:
Click the delete button for the target task.
Expected Result: The task is removed from the Task List.

TC-05: Task Input Form
Scenario: Verify adding a task with a present or past due date.
Test Steps:
Enter a task title, description, and priority.
Enter a present or past date in the due date field.
Click the Add Task button.
Expected Result: A validation error message appears indicating the due date must be in the future, and no task is added.

TC-06: Task Editing Form
Scenario: Verify editing an existing task with valid inputs.
Test Steps:
Select a task to edit.
Modify the title, description, due date, or priority.
Click Update Task.
Expected Result: The task shows updated information in the Task List.

TC-07: Task Editing Form
Scenario: Verify editing a task without a title.
Test Steps:
Select a task to edit.
Leave the title field empty.
Modify the description, due date, or priority.
Click Update Task.
Expected Result: A validation error message appears, preventing the update if the title is empty.

TC-08: Task List
Scenario: Verify filtering tasks by priority (High, Medium, Low).
Test Steps:
Sort the Task List by priority.
Expected Result: Only tasks with the selected priority are displayed.

TC-09: Task List
Scenario: Verify sorting tasks by due date or alphabetically.
Test Steps:
Sort tasks by due date or alphabetically from the Task List.
Expected Result: The Task List is sorted correctly.

TC-10: Task Editing Form
Scenario: User clicks Edit on an existing task.
Test Steps:
Select an existing task in the Task List.
Click Edit to enter editing mode for that task.
Expected Result: The task’s details are shown in editable fields.