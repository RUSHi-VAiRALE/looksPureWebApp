import { FaChevronDown } from 'react-icons/fa';

export default function ProductExpandableSection({ 
  title, 
  isExpanded, 
  onToggle, 
  children 
}) {
  return (
    <div className="border-t border-gray-200">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="text-base font-medium text-gray-900">{title}</span>
        <FaChevronDown 
          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {isExpanded && (
        <div className="pb-4 pr-2">
          <div className="text-gray-700">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}