import React from 'react';
import { Type, AlignLeft, AlignCenter, AlignRight, CaseLower, CaseUpper, Delete } from 'lucide-react';

interface FormatOptionProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function FormatOption({ label, icon, onClick }: FormatOptionProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

interface FormatOptionsProps {
  onFormat: (type: string) => void;
}

function FormatOptions({ onFormat }: FormatOptionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <FormatOption
        label="Uppercase"
        icon={<CaseUpper className="h-4 w-4" />}
        onClick={() => onFormat('uppercase')}
      />
      <FormatOption
        label="Lowercase"
        icon={<CaseLower className="h-4 w-4" />}
        onClick={() => onFormat('lowercase')}
      />
      <FormatOption
        label="Capitalize"
        icon={<Type className="h-4 w-4" />}
        onClick={() => onFormat('capitalize')}
      />
      <FormatOption
        label="Remove Extra Spaces"
        icon={<Delete className="h-4 w-4" />}
        onClick={() => onFormat('removeSpaces')}
      />
      <FormatOption
        label="Left Align"
        icon={<AlignLeft className="h-4 w-4" />}
        onClick={() => onFormat('alignLeft')}
      />
      <FormatOption
        label="Center Align"
        icon={<AlignCenter className="h-4 w-4" />}
        onClick={() => onFormat('alignCenter')}
      />
      <FormatOption
        label="Right Align"
        icon={<AlignRight className="h-4 w-4" />}
        onClick={() => onFormat('alignRight')}
      />
    </div>
  );
}

export default FormatOptions;