-- declare CTE as RECURSIVE
with RECURSIVE employee_managers as (
-- this is the base query
  select * from employees
  	where id = 4

-- The recursive part: create a UNION
-- that recursively joins a table to the CTE
  UNION ALL
  select employees.*
  from employees
-- note that we are JOINING to the CTE, not the table
  	JOIN employee_managers on employees.id = employee_managers.manager_id
),
-- Add the employee rank as their depth from the top, using ROW_NUMBER()
employee_chain as (
  select
      employee_managers.*
      , (ROW_NUMBER() OVER ()) - 1 as skip_count -- subtract 1 (postgres is 1-indexed!)
  from employee_managers
)

-- Now we can query the CTE to find the skip level
select * from employee_chain
where skip_count = 2;
