package com.studentbackend.demo.controller;

import com.studentbackend.demo.dto.TaskSummaryDto;
import com.studentbackend.demo.entity.Priority;
import com.studentbackend.demo.entity.Status;
import com.studentbackend.demo.entity.Task;
import com.studentbackend.demo.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @GetMapping
    public List<Task> getAllTasks(
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) Priority priority,
            @RequestParam(required = false) String sort
    ) {
        return taskService.getAllTasks(status, priority, sort);
    }

    @GetMapping("/{id}")
    public Task getTask(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @PatchMapping("/{id}/status")
    public Task updateStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest request
    ) {
        return taskService.updateStatus(id, request.getStatus());
    }

    @GetMapping("/summary")
    public TaskSummaryDto getSummary() {
        return taskService.getTaskSummary();
    }

    static class StatusUpdateRequest {
        private Status status;
        public Status getStatus() { return status; }
        public void setStatus(Status status) { this.status = status; }
    }
}