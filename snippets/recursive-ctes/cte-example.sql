---
filename: query.sql
---

-- Wrap that Big Nasty Join™ into a CTE
with user_page_views as (
  select
  	users.id as user_id
  	, page_views.event_time
  	, page_views.page_path
  from page_views
  	inner join sessions on sessions.id = page_views.session_id
  	inner join users on users.id = sessions.user_id
)

-- And get a nice clean querying interface later!
select
 	page_path
    , date_trunc('day', event_time) as day
    , count(distinct user_id)
from user_page_views
group by 1, 2
