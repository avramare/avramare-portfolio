import React from 'react';
import { History as HistoryInterface } from './interface';
import { Ps1 } from '../Ps1';

export const History: React.FC<{ history: Array<HistoryInterface> }> = ({
  history,
}) => {
  return (
    <>
      {history.map((entry: HistoryInterface, index: number) => {
        const isError = entry.output.startsWith('shell: command not found');
        return (
          <div key={entry.command + index} className="mb-2">
            {entry.command !== '' && (
              <div className="flex flex-row">
                <div className="flex-shrink">
                  <Ps1 />
                </div>
                <div className="flex-grow term-ok">{entry.command}</div>
              </div>
            )}

            <p
              className={`whitespace-pre-wrap ${isError ? 'term-error' : 'term-ok'}`}
              style={{ lineHeight: 'normal' }}
              dangerouslySetInnerHTML={{ __html: entry.output }}
            />
          </div>
        );
      })}
    </>
  );
};

export default History;
