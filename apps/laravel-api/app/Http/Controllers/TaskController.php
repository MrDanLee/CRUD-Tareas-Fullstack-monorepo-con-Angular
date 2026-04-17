<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // GET /api/tasks
    public function index()
    {
        return Task::all();
    }

    // POST /api/tasks
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
        ]);


        return Task::create($validated);
    }

    // GET /api/tasks/{id}
    public function show(Task $task)
    {
        return $task;
    }

    // PATCH /api/tasks/{id}
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string',
            'description' => 'sometimes|string',
            'status' => 'sometimes|in:OPEN,IN_PROGRESS,DONE'
        ]);
        $task->update($validated);
        return $task;
    }

    // DELETE /api/tasks/{id}
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->noContent();
    }
}
