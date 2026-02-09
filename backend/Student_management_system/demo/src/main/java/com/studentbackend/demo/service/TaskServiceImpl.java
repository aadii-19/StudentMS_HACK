package com.studentbackend.demo.service;

import com.studentbackend.demo.dto.TaskSummaryDto;
import com.studentbackend.demo.entity.Priority;
import com.studentbackend.demo.entity.Status;
import com.studentbackend.demo.entity.Task;
import com.studentbackend.demo.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getAllTasks(Status status, Priority priority, String sort) {

        Sort sortBy = Sort.unsorted();
        if ("dueDate".equalsIgnoreCase(sort)) {
            sortBy = Sort.by("dueDate").ascending();
        }

        if (status != null && priority != null) {
            return taskRepository.findByStatusAndPriority(status, priority, sortBy);
        }

        if (status != null) {
            return taskRepository.findByStatus(status, sortBy);
        }

        if (priority != null) {
            return taskRepository.findByPriority(priority, sortBy);
        }

        return taskRepository.findAll(sortBy);
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    @Override
    public Task updateTask(Long id, Task updatedTask) {
        Task existing = getTaskById(id);

        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setDueDate(updatedTask.getDueDate());
        existing.setPriority(updatedTask.getPriority());
        existing.setStatus(updatedTask.getStatus());

        return taskRepository.save(existing);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public Task updateStatus(Long id, Status status) {
        Task task = getTaskById(id);
        task.setStatus(status);
        return taskRepository.save(task);
    }

    @Override
    public TaskSummaryDto getTaskSummary() {

        long total = taskRepository.count();
        long completed = taskRepository.countByStatus(Status.COMPLETED);
        long pending = taskRepository.countByStatus(Status.PENDING);

        return new TaskSummaryDto(total, completed, pending);
    }
}

