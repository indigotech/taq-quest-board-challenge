export const QuestPlayerHud = () => (
  <div
    className="flex flex-wrap items-center gap-x-[28px] gap-y-[20px] rounded-[6px] border px-[22px] py-[16px]"
    style={{
      background: 'var(--color-neutral-strong)',
      borderColor: 'var(--color-primary-strong)',
      color: 'var(--ficha-texto)',
      boxShadow: 'inset 0 0 0 4px var(--color-neutral-strong), inset 0 0 0 5px var(--ficha-borda)',
    }}>
    <div className="flex items-center gap-[14px]">
      <div
        className="font-secondary flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 text-[18px] font-bold"
        style={{
          background: 'var(--color-cta-medium)',
          borderColor: 'var(--color-primary-medium)',
          color: 'var(--avatar-texto)',
        }}>
        R
      </div>
      <div>
        <div className="font-secondary text-[19px] font-bold" style={{ color: 'var(--ficha-nome)' }}>
          Recruta
        </div>
        <div className="text-[15px] italic" style={{ color: 'var(--ficha-apoio)' }}>
          Recruta da Guilda Taqtile · Nível 1
        </div>
      </div>
    </div>

    <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-[6px]">
      <div className="flex justify-between text-[15px]" style={{ color: 'var(--ficha-xp-rotulo)' }}>
        <span>Experiência</span>
        <span className="font-secondary text-[13px]" style={{ color: 'var(--color-primary-soft)' }}>
          0 / 100 XP
        </span>
      </div>
      <div
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
        role="progressbar"
        aria-label="Experiência até o próximo nível"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        className="h-[12px] overflow-hidden rounded-[6px] border"
        style={{ background: 'var(--ficha-xp-trilho)', borderColor: 'var(--ficha-borda)' }}>
        <div className="h-full" style={{ width: '0%', background: 'var(--color-primary-medium)' }} />
      </div>
    </div>
  </div>
);
