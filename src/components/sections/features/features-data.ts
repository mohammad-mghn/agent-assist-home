import type { LucideIcon } from "lucide-react";
import {
  Download,
  FolderTree,
  Globe,
  Hash,
  Keyboard,
  Languages,
  Settings,
  Shield,
  TestTube,
} from "lucide-react";

export type FeatureItemConfig = {
  icon: LucideIcon;
  key:
    | "worksEverywhere"
    | "twoTriggers"
    | "keyboardDropdown"
    | "library"
    | "json"
    | "safeImports"
    | "testPanel"
    | "controls"
    | "themesLanguages";
  size: "medium" | "large";
  highlight?: boolean;
  color: string;
  bgColor: string;
};

export const FEATURE_ITEMS: FeatureItemConfig[] = [
  {
    icon: Globe,
    key: "worksEverywhere",
    size: "large",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Hash,
    key: "twoTriggers",
    size: "medium",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Keyboard,
    key: "keyboardDropdown",
    size: "large",
    highlight: true,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: FolderTree,
    key: "library",
    size: "medium",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Download,
    key: "json",
    size: "medium",
    highlight: true,
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: Shield,
    key: "safeImports",
    size: "medium",
    highlight: true,
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: TestTube,
    key: "testPanel",
    size: "medium",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-500/10",
  },
  {
    icon: Settings,
    key: "controls",
    size: "medium",
    color: "from-gray-500 to-slate-500",
    bgColor: "bg-gray-500/10",
  },
  {
    icon: Languages,
    key: "themesLanguages",
    size: "large",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
  },
];
