import styles from './TransplantFilter.module.scss'

interface TransplantFilterProps {
  numberStops: number[]
  onChange: (stops: number[]) => void
}

export const TransplantFilter = ({ numberStops, onChange }: TransplantFilterProps) => {
  const options = [
    { value: 'all', label: 'Все', stops: [0, 1, 2, 3] },
    { value: 0, label: 'Без пересадок', stops: [0] },
    { value: 1, label: '1 пересадка', stops: [1] },
    { value: 2, label: '2 пересадки', stops: [2] },
    { value: 3, label: '3 пересадки', stops: [3] },
  ]

  return (
    <div className={styles.transplantFilter}>
      <h3 className={styles.header}>количество пересадок</h3>
      {options.map((option) => (
        <label key={option.value} className={styles.label}>
          <input
            type="checkbox"
            checked={
              option.value === 'all'
                ? numberStops.length === 4
                : numberStops.includes(option.value as number)
            }
            onChange={() => {
              if (option.value === 'all') {
                onChange(numberStops.length === 4 ? [] : [0, 1, 2, 3])
              } else {
                const newNumberStops = numberStops.includes(option.value as number)
                  ? numberStops.filter((number) => number !== option.value)
                  : [...numberStops, option.value]
                onChange(newNumberStops as number[])
              }
            }}
            className={styles.transplantInput}
          />
          <span className={styles.transplantInputVariants}>{option.label}</span>
        </label>
      ))}
    </div>
  )
}
