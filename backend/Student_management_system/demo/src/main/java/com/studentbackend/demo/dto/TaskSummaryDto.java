package com.studentbackend.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskSummaryDto {
    private long totalTasks;
    private long completedTasks;
    private long pendingTasks;
}