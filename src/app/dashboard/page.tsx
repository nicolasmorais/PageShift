"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster, toast } from "sonner";

export default function DashboardPage() {
  const [selectedPage, setSelectedPage] = useState('/');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setSelectedPage(data.mainPage || '/');
      })
      .catch(() => {
        toast.error("Failed to load current settings.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mainPage: selectedPage }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      toast.success("Main page updated successfully!");
    } catch (error) {
      toast.error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Toaster richColors />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>
              Select which page will be displayed as the main page of your website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="main-page">Main Page</Label>
                {isLoading ? (
                  <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
                ) : (
                  <Select value={selectedPage} onValueChange={setSelectedPage}>
                    <SelectTrigger id="main-page">
                      <SelectValue placeholder="Select a page" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="/">Advertorial V1</SelectItem>
                      <SelectItem value="/v2">Advertorial V2</SelectItem>
                      <SelectItem value="/v3">Advertorial V3</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSave} disabled={isLoading || isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}