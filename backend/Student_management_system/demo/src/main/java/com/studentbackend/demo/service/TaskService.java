package com.studentbackend.demo.service;

import com.studentbackend.demo.dto.TaskSummaryDto;
import com.studentbackend.demo.entity.Priority;
import com.studentbackend.demo.entity.Status;
import com.studentbackend.demo.entity.Task;

import java.util.List;

public interface TaskService {
    Task createTask(Task task);

    List<Task> getAllTasks(Status status, Priority priority, String sort);

    Task getTaskById(Long id);

    Task updateTask(Long id, Task task);

    void deleteTask(Long id);

    Task updateStatus(Long id, Status status);

    TaskSummaryDto getTaskSummary();
}
