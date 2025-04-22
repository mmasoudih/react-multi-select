import { useState } from 'react';
import MultiSelect from '@components/MultiSelect';

const customOptions = [
  { label: 'React', value: 'react', emoji: '⚛️' },
  { label: 'TypeScript', value: 'typescript', emoji: '📘' },
  { label: 'Node.js', value: 'nodejs', emoji: '🟢' },
  { label: 'MongoDB', value: 'mongodb', emoji: '🍃' },
  { label: 'GraphQL', value: 'graphql', emoji: '🟣' },
  { label: 'Docker', value: 'docker', emoji: '🐳' },
  { label: 'AWS', value: 'aws', emoji: '☁️' },
  { label: 'Python', value: 'python', emoji: '🐍' },
  { label: 'Rust', value: 'rust', emoji: '🦀' },
  { label: 'Go', value: 'go', emoji: '🚀' },
];

function App() {
  const [selectedOptions, setSelectedOptions] = useState<
    Array<{ label: string; value: string; emoji?: string }>
  >([]);

  return (
    <>
      <MultiSelect options={customOptions} value={selectedOptions} onChange={setSelectedOptions} />
      <div>
        {selectedOptions.length > 0 && (
          <div className="selected-options">
            <h2>Selected Technologies:</h2>
            <ul>
              {selectedOptions.map(option => (
                <li key={option.value}>
                  {option.emoji} {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
