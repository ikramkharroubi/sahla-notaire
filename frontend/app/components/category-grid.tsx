'use client'

import { FileText, XCircle, FileCodeIcon as FileContract, Heart, Landmark, Receipt, MessageSquare, Home, Package, FileSignature, FileCheck, Zap, Users, Scale, Car, Umbrella, Activity, Shield, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Map of icon names to their components
const iconMap: Record<string, LucideIcon> = {
  'file-text': FileText,
  'x-circle': XCircle,
  'file-contract': FileContract,
  'heart': Heart,
  'landmark': Landmark,
  'receipt': Receipt,
  'message-square': MessageSquare,
  'home': Home,
  'package': Package,
  'file-signature': FileSignature,
  'file-check': FileCheck,
  'zap': Zap,
  'users': Users,
  'scale': Scale,
  'car': Car,
  'umbrella': Umbrella,
  'activity': Activity,
  'shield': Shield,
}

// Color mapping for categories
const colorMap = {
  'blue': 'text-blue-500',
  'red': 'text-red-500',
  'green': 'text-green-500',
  'pink': 'text-pink-500',
  'purple': 'text-purple-500',
  'yellow': 'text-yellow-500',
  'orange': 'text-orange-500',
  'indigo': 'text-indigo-500',
  'gray': 'text-gray-500',
  'teal': 'text-teal-500',
  'cyan': 'text-cyan-500',
  'amber': 'text-amber-500',
  'lime': 'text-lime-500',
  'emerald': 'text-emerald-500',
  'rose': 'text-rose-500',
  'fuchsia': 'text-fuchsia-500',
  'sky': 'text-sky-500',
  'violet': 'text-violet-500',
  'stone': 'text-stone-500',
  'slate': 'text-slate-500',
}

interface Category {
  id: number;
  name: string;
  description: string;
}

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/document-categories/');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm animate-pulse h-32"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading categories: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {categories.map((category, index) => {
        const colorKeys = Object.keys(colorMap);
        const colorKey = colorKeys[index % colorKeys.length];
        const iconKeys = Object.keys(iconMap);
        const iconKey = iconKeys[index % iconKeys.length];
        const Icon = iconMap[iconKey];
        
        return (
          <Link
            key={category.id}
            href={`/documents/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="group p-4 rounded-lg bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 flex flex-col items-center justify-center text-center h-32"
          >
            <Icon className={`w-8 h-8 ${colorMap[colorKey as keyof typeof colorMap]} mb-2 transition-transform duration-300 group-hover:scale-110`} />
            <span className="text-sm font-medium text-gray-800 line-clamp-2">{category.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

