-- Rode este arquivo em: Supabase > seu projeto > SQL Editor > New query > Run
-- (depois de já ter rodado schema.sql)

create extension if not exists pgcrypto;

create table public.treinos (
  id uuid primary key default gen_random_uuid(),
  objetivo text not null check (objetivo in ('emagrecimento', 'hipertrofia', 'massa')),
  nome text not null,
  duracao_min int not null,
  ordem int not null default 0
);

create table public.exercicios (
  id uuid primary key default gen_random_uuid(),
  treino_id uuid references public.treinos(id) on delete cascade,
  nome text not null,
  series int not null,
  repeticoes text not null,
  descanso_seg int,
  ordem int not null default 0,
  video_url text
);

-- Conteúdo de treino é público (todo usuário logado pode ver a biblioteca inteira)
alter table public.treinos enable row level security;
alter table public.exercicios enable row level security;

create policy "treinos_select_all" on public.treinos for select using (true);
create policy "exercicios_select_all" on public.exercicios for select using (true);

-- Sem policy de insert/update/delete: só dá para editar o conteúdo pelo
-- SQL Editor ou pelo Table Editor do Supabase, nunca pelo app.

-- ===== Conteúdo inicial =====

with t as (
  insert into public.treinos (objetivo, nome, duracao_min, ordem)
  values ('emagrecimento', 'Circuito metabólico', 32, 1)
  returning id
)
insert into public.exercicios (treino_id, nome, series, repeticoes, descanso_seg, ordem)
select id, nome, series, repeticoes, descanso_seg, ordem from t cross join (values
  ('Agachamento livre', 3, '15', 45, 1),
  ('Burpee', 3, '10', 45, 2),
  ('Mountain climber', 3, '30s', 30, 3),
  ('Prancha', 3, '40s', 30, 4)
) as ex(nome, series, repeticoes, descanso_seg, ordem);

with t as (
  insert into public.treinos (objetivo, nome, duracao_min, ordem)
  values ('emagrecimento', 'Cardio + core', 25, 2)
  returning id
)
insert into public.exercicios (treino_id, nome, series, repeticoes, descanso_seg, ordem)
select id, nome, series, repeticoes, descanso_seg, ordem from t cross join (values
  ('Corrida leve', 1, '15 min', null, 1),
  ('Abdominal bicicleta', 3, '20', 30, 2),
  ('Prancha lateral', 3, '30s', 30, 3)
) as ex(nome, series, repeticoes, descanso_seg, ordem);

with t as (
  insert into public.treinos (objetivo, nome, duracao_min, ordem)
  values ('hipertrofia', 'Peito e tríceps', 50, 1)
  returning id
)
insert into public.exercicios (treino_id, nome, series, repeticoes, descanso_seg, ordem)
select id, nome, series, repeticoes, descanso_seg, ordem from t cross join (values
  ('Supino reto', 4, '10', 90, 1),
  ('Crucifixo', 3, '12', 60, 2),
  ('Tríceps corda', 4, '12', 60, 3),
  ('Mergulho no banco', 3, '12', 60, 4)
) as ex(nome, series, repeticoes, descanso_seg, ordem);

with t as (
  insert into public.treinos (objetivo, nome, duracao_min, ordem)
  values ('hipertrofia', 'Costas e bíceps', 48, 2)
  returning id
)
insert into public.exercicios (treino_id, nome, series, repeticoes, descanso_seg, ordem)
select id, nome, series, repeticoes, descanso_seg, ordem from t cross join (values
  ('Puxada frontal', 4, '10', 90, 1),
  ('Remada curvada', 4, '10', 90, 2),
  ('Rosca direta', 3, '12', 60, 3)
) as ex(nome, series, repeticoes, descanso_seg, ordem);

with t as (
  insert into public.treinos (objetivo, nome, duracao_min, ordem)
  values ('massa', 'Pernas pesado', 55, 1)
  returning id
)
insert into public.exercicios (treino_id, nome, series, repeticoes, descanso_seg, ordem)
select id, nome, series, repeticoes, descanso_seg, ordem from t cross join (values
  ('Agachamento livre', 5, '6', 120, 1),
  ('Leg press', 4, '8', 90, 2),
  ('Cadeira extensora', 3, '12', 60, 3),
  ('Panturrilha em pé', 4, '15', 45, 4)
) as ex(nome, series, repeticoes, descanso_seg, ordem);

with t as (
  insert into public.treinos (objetivo, nome, duracao_min, ordem)
  values ('massa', 'Ombro e trapézio', 40, 2)
  returning id
)
insert into public.exercicios (treino_id, nome, series, repeticoes, descanso_seg, ordem)
select id, nome, series, repeticoes, descanso_seg, ordem from t cross join (values
  ('Desenvolvimento militar', 4, '8', 90, 1),
  ('Elevação lateral', 4, '12', 60, 2),
  ('Encolhimento', 3, '15', 60, 3)
) as ex(nome, series, repeticoes, descanso_seg, ordem);
