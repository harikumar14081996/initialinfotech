"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/rich-text-editor";

type EmployeePayload = {
  id?: string;
  name: string;
  designation: string;
  photoUrl: string;
  dob: string;
  personalEmail: string;
  phone: string;
  startDate: string;
  endDate: string;
  dutiesHtml: string;
  isActive: boolean;
};

const blankEmployee: EmployeePayload = {
  name: "",
  designation: "",
  photoUrl: "",
  dob: "",
  personalEmail: "",
  phone: "",
  startDate: "",
  endDate: "",
  dutiesHtml: "<p></p>",
  isActive: true,
};

export function EmployeesClient({ initialEmployees }: { initialEmployees: EmployeePayload[] }) {
  const [employees, setEmployees] = useState(initialEmployees);
  const [form, setForm] = useState<EmployeePayload>(blankEmployee);
  const [busy, setBusy] = useState(false);

  async function syncEmployees() {
    // A quick hack since we don't have a GET endpoint for employees: reload the page to get fresh data
    window.location.reload();
  }

  async function save() {
    setBusy(true);
    try {
      const method = form.id ? "PATCH" : "POST";
      const res = await fetch("/api/admin/employees", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save employee");
      }
      toast.success(form.id ? "Employee updated." : "Employee created.");
      setForm(blankEmployee);
      await syncEmployees();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Remove this employee?")) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/employees", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete employee");
      }
      toast.success("Employee removed.");
      await syncEmployees();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Existing employees */}
      <div className="grid gap-4 md:grid-cols-2">
        {employees.map((e) => (
          <div key={e.id} className="section-card flex flex-col justify-between rounded-[2rem] p-6">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-lg font-semibold text-[var(--color-text)]">
                    {e.name}
                  </p>
                  {e.designation && (
                    <p className="mt-0.5 text-sm font-medium text-[var(--color-accent)]">{e.designation}</p>
                  )}
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{e.personalEmail}</p>
                </div>
                {!e.isActive && (
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold tracking-wide text-rose-700">
                    Former
                  </span>
                )}
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Button variant="secondary" onClick={() => setForm(e)} disabled={busy}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => remove(e.id!)} disabled={busy}>
                Delete
              </Button>
            </div>
          </div>
        ))}
        {employees.length === 0 && (
          <p className="col-span-full text-sm text-[var(--color-muted)]">No employees configured yet.</p>
        )}
      </div>

      {/* Editor */}
      <div className="section-card rounded-[2rem] p-6 text-sm lg:p-8">
        <h2 className="font-mono text-2xl font-semibold">
          {form.id ? "Edit employee" : "Add employee"}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Full name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          <Input
            placeholder="Designation (e.g. Senior Developer)"
            value={form.designation}
            onChange={(event) => setForm({ ...form, designation: event.target.value })}
          />
          <Input
            placeholder="Photo URL"
            value={form.photoUrl}
            onChange={(event) => setForm({ ...form, photoUrl: event.target.value })}
          />
          <Input
            type="date"
            placeholder="Date of Birth"
            value={form.dob}
            onChange={(event) => setForm({ ...form, dob: event.target.value })}
          />
          <Input
            placeholder="Personal email"
            value={form.personalEmail}
            onChange={(event) => setForm({ ...form, personalEmail: event.target.value })}
          />
          <Input
            placeholder="Phone number"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />
          <Input
            type="date"
            placeholder="Start date"
            value={form.startDate}
            onChange={(event) => setForm({ ...form, startDate: event.target.value })}
          />
          <Input
            type="date"
            placeholder="End date"
            value={form.endDate}
            onChange={(event) => setForm({ ...form, endDate: event.target.value })}
          />
          <label className="flex items-center gap-3 rounded-[1rem] border border-[var(--color-line)] bg-white px-4 py-3 text-[var(--color-text)] cursor-pointer">
            <input
              type="checkbox"
              className="h-5 w-5 rounded-md border-gray-300 text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
              checked={form.isActive}
              onChange={(event) => setForm({ ...form, isActive: event.target.checked })}
            />
            Currently working
          </label>
        </div>
        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-[var(--color-text)]">
            Duties & Achievements
          </label>
          <div className="rounded-xl border border-[var(--color-line)] bg-white overflow-hidden">
            <RichTextEditor
              value={form.dutiesHtml}
              onChange={(val) => setForm({ ...form, dutiesHtml: val })}
            />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Button disabled={busy} onClick={save}>
            {form.id ? "Update employee" : "Create employee"}
          </Button>
          <Button variant="ghost" disabled={busy} onClick={() => setForm(blankEmployee)}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
