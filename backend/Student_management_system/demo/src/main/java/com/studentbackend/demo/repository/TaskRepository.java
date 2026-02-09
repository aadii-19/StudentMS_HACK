package com.studentbackend.demo.repository;

import com.studentbackend.demo.entity.Priority;
import com.studentbackend.demo.entity.Status;
import com.studentbackend.demo.entity.Task;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findByStatus(Status status, Sort sort);

    List<Task> findByPriority(Priority priority, Sort sort);

    List<Task> findByStatusAndPriority(Status status, Priority priority, Sort sort);

    long countByStatus(Status status);
}
