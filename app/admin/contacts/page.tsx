"use client";

import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { 
  Loader2, 
  Search, 
  Mail, 
  Phone, 
  Trash2, 
  Eye, 
  MessageSquare,
  CheckCircle,
  Archive,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";

interface IContact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  read: "bg-yellow-100 text-yellow-800",
  replied: "bg-green-100 text-green-800",
  archived: "bg-gray-100 text-gray-800",
};

const statusIcons: Record<string, React.ReactNode> = {
  new: <Clock className="w-3 h-3" />,
  read: <Eye className="w-3 h-3" />,
  replied: <CheckCircle className="w-3 h-3" />,
  archived: <Archive className="w-3 h-3" />,
};

export default function AdminContacts() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (subjectFilter !== "all") params.append("subject", subjectFilter);
      
      const res = await fetch(`/api/contact?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (_error) {
      toast.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [statusFilter, subjectFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts(contacts.map(c => c._id === id ? { ...c, status: newStatus as IContact["status"] } : c));
        if (selectedContact?._id === id) {
          setSelectedContact({ ...selectedContact, status: newStatus as IContact["status"] });
        }
        toast.success("Status updated");
      }
    } catch (_error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setContacts(contacts.filter(c => c._id !== id));
        setIsDialogOpen(false);
        toast.success("Message deleted");
      }
    } catch (_error) {
      toast.error("Failed to delete message");
    }
  };

  const openContactDialog = (contact: IContact) => {
    setSelectedContact(contact);
    setIsDialogOpen(true);
    // Mark as read if new
    if (contact.status === "new") {
      handleStatusChange(contact._id, "read");
    }
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.message.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: contacts.length,
    new: contacts.filter(c => c.status === "new").length,
    replied: contacts.filter(c => c.status === "replied").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-saddle-brown">Contact Messages</h1>
          <p className="text-modern-earthy/60 mt-1">
            {stats.new} new • {stats.replied} replied • {stats.total} total
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-stone-200 flex-1 max-w-md">
          <Search className="text-gray-400 h-5 w-5" />
          <Input 
            placeholder="Search messages..." 
            className="border-none focus-visible:ring-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <select 
          className="h-10 px-3 rounded-lg border border-stone-200 bg-white text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
        </select>

        <select 
          className="h-10 px-3 rounded-lg border border-stone-200 bg-white text-sm"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option value="all">All Subjects</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Project Consultation">Project Consultation</option>
          <option value="Bulk Order">Bulk Order</option>
          <option value="Partnership">Partnership</option>
        </select>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        {loading ? (
          <div className="h-48 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-saddle-brown" />
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-gray-500">
            <MessageSquare className="w-8 h-8 mr-2 opacity-50" />
            No messages found
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {filteredContacts.map((contact) => (
              <div 
                key={contact._id} 
                className={`p-4 hover:bg-stone-50 cursor-pointer transition-colors ${contact.status === "new" ? "bg-blue-50/30" : ""}`}
                onClick={() => openContactDialog(contact)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold text-saddle-brown truncate ${contact.status === "new" ? "font-bold" : ""}`}>
                        {contact.name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${statusColors[contact.status]}`}>
                        {statusIcons[contact.status]}
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-xs text-modern-earthy/60 mb-1">
                      {contact.email} • {contact.subject}
                    </p>
                    <p className="text-sm text-modern-earthy/80 line-clamp-1">
                      {contact.message}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-modern-earthy/50">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-modern-earthy/40">
                      {new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-warm-cream max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl text-saddle-brown">
              Message Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-6 mt-4">
              {/* Sender Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-modern-earthy/60 uppercase">Name</p>
                  <p className="text-sm font-medium">{selectedContact.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-modern-earthy/60 uppercase">Status</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs inline-flex items-center gap-1 ${statusColors[selectedContact.status]}`}>
                    {statusIcons[selectedContact.status]}
                    {selectedContact.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-modern-earthy/60 uppercase flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email
                  </p>
                  <a href={`mailto:${selectedContact.email}`} className="text-sm font-medium text-saddle-brown hover:underline">
                    {selectedContact.email}
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-modern-earthy/60 uppercase flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Phone
                  </p>
                  <p className="text-sm font-medium">{selectedContact.phone || "Not provided"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-modern-earthy/60 uppercase">Subject</p>
                  <p className="text-sm font-medium">{selectedContact.subject}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-modern-earthy/60 uppercase">Received</p>
                  <p className="text-sm font-medium">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-modern-earthy/60 uppercase">Message</p>
                <div className="bg-white p-4 rounded-lg border border-stone-200">
                  <p className="text-sm whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-200">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleStatusChange(selectedContact._id, "replied")}
                  disabled={selectedContact.status === "replied"}
                >
                  <CheckCircle className="w-4 h-4 mr-1" /> Mark Replied
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleStatusChange(selectedContact._id, "archived")}
                  disabled={selectedContact.status === "archived"}
                >
                  <Archive className="w-4 h-4 mr-1" /> Archive
                </Button>
                <a href={`mailto:${selectedContact.email}`}>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-1" /> Reply via Email
                  </Button>
                </a>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto"
                  onClick={() => handleDelete(selectedContact._id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
