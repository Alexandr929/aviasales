import styles from './SortTabs.module.scss'

type SortTabsProps = {
  sortBy: 'price' | 'duration' | 'optimal'
  onChange: (value: 'price' | 'duration' | 'optimal') => void
}

export const SortTabs = ({ onChange, sortBy }: SortTabsProps) => {
  return (
    <div className={styles.sortTabs}>
      <button
        onClick={() => onChange('price')}
        className={`${styles.buttonPrice} ${sortBy === 'price' ? styles.active : ''}`}
      >
        <span className={`${styles.cheap} ${sortBy === 'price' ? styles.active : ''}`}>
          САМЫЙ ДЕШЕВЫЙ
        </span>
      </button>
      <button
        onClick={() => onChange('duration')}
        className={`${styles.buttonDuration} ${sortBy === 'duration' ? styles.active : ''}`}
      >
        <span className={`${styles.fast} ${sortBy === 'duration' ? styles.active : ''}`}>
          САМЫЙ БЫСТРЫЙ
        </span>
      </button>
      <button
        onClick={() => onChange('optimal')}
        className={`${styles.buttonOptimal} ${sortBy === 'optimal' ? styles.active : ''}`}
      >
        <span className={`${styles.optimal} ${sortBy === 'optimal' ? styles.active : ''}`}>
          ОПТИМАЛЬНЫЙ
        </span>
      </button>
    </div>
  )
}
