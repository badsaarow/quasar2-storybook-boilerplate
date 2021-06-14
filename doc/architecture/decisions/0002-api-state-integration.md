# 2. API State Integration

Date: 2021-06-09

## Status

Proposed

## Context

### useAxios

Page handles API by useAxios
Page contains business logic.

- pros: 
  - no relation between vuex and axios
  - easy to know loading status
- cons
  - page should handle vuex
  - strong dependency page and api

### page -> service -> axios, vuex

Service module handle axios and store to vuex
Service contains business logic.

### page -> vuex actions -> axios

Official recommended pattern by Vuex.
Action contains business logic.

- pros:
  - No API dependency at page 
- cons:
  - Big actions.
  - All data pass by vuex

## Decision

useAxios

## Consequences


