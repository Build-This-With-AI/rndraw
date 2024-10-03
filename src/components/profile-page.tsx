"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/nextjs";
import {
  CalendarDays,
  Github,
  Lock,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Unlock,
} from "lucide-react";
import { useState } from "react";

export function ProfilePage() {
  const { user } = useUser();
  if (!user) return null;
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.imageUrl} alt={user.username ?? ""} />
            <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>
              {user.firstName} {user.lastName}
            </CardTitle>
            <CardDescription>@{user.username}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="emails">Emails</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="external">External Accounts</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>
                    Joined on{" "}
                    {new Date(user.createdAt ?? 0).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>
                    Primary email:{" "}
                    {
                      user.emailAddresses.find(
                        (email) => email.id === user.primaryEmailAddressId,
                      )?.emailAddress
                    }
                  </span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="emails" className="mt-4">
              <ul className="space-y-2">
                {user.emailAddresses.map((email) => (
                  <li
                    key={email.id}
                    className="flex items-center justify-between"
                  >
                    <span>{email.emailAddress}</span>
                    <Badge
                      variant={
                        email.verification?.status === "verified"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {email.verification?.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="security" className="mt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {user.passwordEnabled ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Unlock className="h-4 w-4" />
                  )}
                  <span>
                    Password {user.passwordEnabled ? "enabled" : "disabled"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {user.twoFactorEnabled ? (
                    <ShieldCheck className="h-4 w-4" />
                  ) : (
                    <ShieldAlert className="h-4 w-4" />
                  )}
                  <span>
                    Two-factor authentication{" "}
                    {user.twoFactorEnabled ? "enabled" : "disabled"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {user.backupCodeEnabled ? (
                    <ShieldCheck className="h-4 w-4" />
                  ) : (
                    <ShieldAlert className="h-4 w-4" />
                  )}
                  <span>
                    Backup codes{" "}
                    {user.backupCodeEnabled ? "enabled" : "disabled"}
                  </span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="external" className="mt-4">
              <ul className="space-y-2">
                {user.externalAccounts.map((account) => (
                  <li key={account.id} className="flex items-center gap-2">
                    {account.provider === "github" && (
                      <Github className="h-4 w-4" />
                    )}
                    <span>
                      {account.provider}: {account.username}
                    </span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
