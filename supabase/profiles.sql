-- Rode este arquivo em: Supabase > seu projeto > SQL Editor > New query > Run
-- Substitui schema.sql e calculadora.sql. Seguro de rodar mais de uma vez:
-- só cria o que ainda não existe.

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  criado_em timestamp with time zone default now()
);

alter table public.profiles add column if not exists nome text;
alter table public.profiles add column if not exists objetivo text;
alter table public.profiles add column if not exists sexo text;
alter table public.profiles add column if not exists idade int;
alter table public.profiles add column if not exists peso numeric;
alter table public.profiles add column if not exists altura numeric;
alter table public.profiles add column if not exists nivel_atividade numeric;
alter table public.profiles add column if not exists tmb numeric;
alter table public.profiles add column if not exists tdee numeric;
alter table public.profiles add column if not exists meta_calorica numeric;

-- Garante que objetivo só aceite os 3 valores válidos (ignora se já existir)
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_objetivo_check'
  ) then
    alter table public.profiles
      add constraint profiles_objetivo_check
      check (objetivo in ('emagrecimento', 'hipertrofia', 'massa'));
  end if;
end $$;

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_proprio" on public.profiles;
create policy "profiles_select_proprio"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_proprio" on public.profiles;
create policy "profiles_insert_proprio"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_proprio" on public.profiles;
create policy "profiles_update_proprio"
  on public.profiles for update
  using (auth.uid() = id);
