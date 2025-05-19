"use client"

import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SearchForm() {
  return (
    <div className="bg-white rounded-xl p-3 shadow-lg flex flex-col md:flex-row gap-3">
      <div className="flex-grow relative">
        <Input 
          type="text" 
          placeholder="Que recherchez-vous ?"
          className="pl-10 border-none bg-[#F8F9FA] placeholder-[#022840]/50"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#022840]/40" />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-full md:w-[180px] border-none bg-[#F8F9FA]">
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les catégories</SelectItem>
          <SelectItem value="civil">État civil</SelectItem>
          <SelectItem value="legal">Documents légaux</SelectItem>
          <SelectItem value="business">Services aux entreprises</SelectItem>
        </SelectContent>
      </Select>
      <Button className="bg-[#022840] hover:bg-[#022840]/90 text-white md:w-[120px]">
        Rechercher
      </Button>
    </div>
  )
}

