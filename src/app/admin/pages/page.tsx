"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  FileText,
  Globe,
  Settings,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const pages = [
  {
    id: 1,
    title: "Home",
    slug: "/",
    status: "published",
    lastModified: "2024-01-15",
    author: "Admin",
    template: "Home Page",
  },
  {
    id: 2,
    title: "About Us",
    slug: "/about",
    status: "published",
    lastModified: "2024-01-10",
    author: "Admin",
    template: "Standard Page",
  },
  {
    id: 3,
    title: "Contact",
    slug: "/contact",
    status: "published",
    lastModified: "2024-01-08",
    author: "Admin",
    template: "Contact Page",
  },
  {
    id: 4,
    title: "Privacy Policy",
    slug: "/privacy",
    status: "draft",
    lastModified: "2024-01-05",
    author: "Admin",
    template: "Legal Page",
  },
  {
    id: 5,
    title: "Terms of Service",
    slug: "/terms",
    status: "draft",
    lastModified: "2024-01-03",
    author: "Admin",
    template: "Legal Page",
  },
  {
    id: 6,
    title: "FAQ",
    slug: "/faq",
    status: "published",
    lastModified: "2024-01-12",
    author: "Admin",
    template: "FAQ Page",
  },
];

const templates = [
  "admin.templates.standard",
  "admin.templates.home",
  "admin.templates.contact",
  "admin.templates.legal",
  "admin.templates.faq",
];
const statusOptions = [
  "admin.status.allStatus",
  "admin.status.published",
  "admin.status.draft",
  "admin.status.archived",
];

const statusMap = {
  "admin.status.allStatus": "All Status",
  "admin.status.published": "published",
  "admin.status.draft": "draft",
  "admin.status.archived": "archived",
};

const templateMap = {
  "admin.templates.standard": "Standard Page",
  "admin.templates.home": "Home Page",
  "admin.templates.contact": "Contact Page",
  "admin.templates.legal": "Legal Page",
  "admin.templates.faq": "FAQ Page",
};

export default function PagesManagementPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(
    "admin.status.allStatus",
  );
  const [filteredPages, setFilteredPages] = useState(pages);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    template: "Standard Page",
    status: "draft",
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterPages(value, selectedStatus);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    filterPages(searchTerm, status);
  };

  const filterPages = (search: string, status: string) => {
    let filtered = pages;

    if (status !== "admin.status.allStatus") {
      filtered = filtered.filter(
        (page) => page.status === statusMap[status as keyof typeof statusMap],
      );
    }

    if (search) {
      filtered = filtered.filter(
        (page) =>
          page.title.toLowerCase().includes(search.toLowerCase()) ||
          page.slug.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredPages(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Page data:", formData);
    setShowCreateForm(false);
    setFormData({
      title: "",
      slug: "",
      content: "",
      template: "Standard Page",
      status: "draft",
    });
  };

  if (showCreateForm) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("admin.pages.createNew.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("admin.pages.createNew.description")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              {t("admin.pages.createNew.pageInfo")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  {t("admin.pages.createNew.pageTitle")}
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder={t("admin.pages.createNew.pageTitlePlaceholder")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">
                  {t("admin.pages.createNew.urlSlug")}
                </Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder={t("admin.pages.createNew.urlSlugPlaceholder")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template">
                  {t("admin.pages.createNew.template")}
                </Label>
                <Select
                  value={formData.template}
                  onValueChange={(value: string) =>
                    setFormData((prev) => ({ ...prev, template: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("admin.pages.createNew.selectTemplate")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template} value={template}>
                        {t(template)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">
                  {t("admin.pages.createNew.status")}
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: string) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("admin.pages.createNew.selectStatus")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">
                      {t("admin.status.draft")}
                    </SelectItem>
                    <SelectItem value="published">
                      {t("admin.status.published")}
                    </SelectItem>
                    <SelectItem value="archived">
                      {t("admin.status.archived")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="content">
                {t("admin.pages.createNew.content")}
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder={t("admin.pages.createNew.contentPlaceholder")}
                rows={12}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCreateForm(false)}
            >
              {t("admin.pages.createNew.cancel")}
            </Button>
            <Button type="submit">
              {t("admin.pages.createNew.createPage")}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("admin.pages.title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("admin.pages.description")}
            </p>
          </div>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t("admin.pages.createPage")}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("admin.pages.totalPages")}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {pages.length}
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("admin.pages.published")}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {pages.filter((p) => p.status === "published").length}
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("admin.pages.drafts")}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {pages.filter((p) => p.status === "draft").length}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Edit className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("admin.pages.templates")}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {templates.length}
              </p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder={t("admin.pages.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t("admin.pages.filterByStatus")} />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {t(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.pages.page")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.pages.url")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.pages.template")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.pages.author")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.pages.lastModified")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.pages.status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.pages.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPages.map((page) => (
                <tr
                  key={page.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {page.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {page.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {page.template}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {page.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {page.lastModified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(page.status)}`}
                    >
                      {t(`admin.status.${page.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing 1 to {filteredPages.length} of {filteredPages.length}{" "}
              results
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                {t("admin.members.previous")}
              </Button>
              <Button variant="outline" size="sm" disabled>
                {t("admin.members.next")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
