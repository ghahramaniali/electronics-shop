"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MoreVertical,
  UserPlus,
  Ban,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const members = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234-567-8900",
    joinDate: "2024-01-15",
    totalOrders: 12,
    totalSpent: 1456.78,
    status: "active",
    location: "New York, USA",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234-567-8901",
    joinDate: "2024-01-10",
    totalOrders: 8,
    totalSpent: 892.45,
    status: "active",
    location: "Los Angeles, USA",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1 234-567-8902",
    joinDate: "2024-01-05",
    totalOrders: 15,
    totalSpent: 2341.12,
    status: "active",
    location: "Chicago, USA",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+1 234-567-8903",
    joinDate: "2023-12-20",
    totalOrders: 6,
    totalSpent: 567.89,
    status: "inactive",
    location: "Houston, USA",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    phone: "+1 234-567-8904",
    joinDate: "2023-12-15",
    totalOrders: 23,
    totalSpent: 3456.78,
    status: "active",
    location: "Phoenix, USA",
  },
  {
    id: 6,
    name: "Diana Martinez",
    email: "diana@example.com",
    phone: "+1 234-567-8905",
    joinDate: "2023-11-30",
    totalOrders: 4,
    totalSpent: 234.56,
    status: "banned",
    location: "Philadelphia, USA",
  },
];

const statusOptions = [
  "admin.status.allStatus",
  "admin.status.active",
  "admin.status.inactive",
  "admin.status.banned",
];

const statusMap = {
  "admin.status.allStatus": "All Status",
  "admin.status.active": "active",
  "admin.status.inactive": "inactive",
  "admin.status.banned": "banned",
};

export default function MembersPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(
    "admin.status.allStatus",
  );
  const [filteredMembers, setFilteredMembers] = useState(members);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterMembers(value, selectedStatus);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    filterMembers(searchTerm, status);
  };

  const filterMembers = (search: string, status: string) => {
    let filtered = members;

    if (status !== "admin.status.allStatus") {
      filtered = filtered.filter(
        (member) =>
          member.status === statusMap[status as keyof typeof statusMap],
      );
    }

    if (search) {
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(search.toLowerCase()) ||
          member.email.toLowerCase().includes(search.toLowerCase()) ||
          member.location.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredMembers(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "banned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("admin.members.title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("admin.members.description")}
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>{t("admin.members.addMember")}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("admin.members.totalMembers")}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {members.length}
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <UserPlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("admin.members.activeMembers")}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {members.filter((m) => m.status === "active").length}
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("admin.members.newThisMonth")}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {
                  members.filter(
                    (m) =>
                      new Date(m.joinDate).getMonth() === new Date().getMonth(),
                  ).length
                }
              </p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("admin.members.totalRevenue")}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                ${members.reduce((sum, m) => sum + m.totalSpent, 0).toFixed(0)}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
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
                placeholder={t("admin.members.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t("admin.members.filterByStatus")} />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {t(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>{t("admin.members.moreFilters")}</span>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.members.member")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.members.contact")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.members.location")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.members.orders")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.members.totalSpent")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.members.status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("admin.members.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {member.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {t("admin.members.joined")} {member.joinDate}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white flex items-center">
                      <Mail className="w-4 h-4 mr-1 text-gray-400 dark:text-gray-500" />
                      {member.email}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                      <Phone className="w-4 h-4 mr-1 text-gray-400 dark:text-gray-500" />
                      {member.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400 dark:text-gray-500" />
                      {member.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {member.totalOrders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    ${member.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}
                    >
                      {t(`admin.status.${member.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                      {member.status === "active" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                      )}
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
              Showing 1 to {filteredMembers.length} of {filteredMembers.length}{" "}
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
