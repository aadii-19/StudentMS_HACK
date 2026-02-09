package com.studentbackend.demo.repository;

import com.studentbackend.demo.entity.Priority;
import com.studentbackend.demo.entity.Status;
import com.studentbackend.demo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findByStatus(Status status);

    List<Task> findByPriority(Priority priority);

    List<Task> findByStatusAndPriority(Status status, Priority priority);
}
