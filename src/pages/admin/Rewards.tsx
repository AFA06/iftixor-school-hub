import { useState } from 'react';
import { Plus, Gift, Trophy, Star, Crown, Medal, Search, Pencil, Trash2, Check, X } from 'lucide-react';
import { PageHeader, DataTableSkeleton, EmptyState, StatusBadge } from '@/components/common/CommonComponents';
import { useRewards, useStudents } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Token rules configuration
const defaultTokenRules = [
  { id: '1', name: 'Excellent Grade (A)', tokens: 10, description: 'Awarded for achieving an A grade' },
  { id: '2', name: 'Good Grade (B)', tokens: 5, description: 'Awarded for achieving a B grade' },
  { id: '3', name: 'Competition Winner', tokens: 50, description: 'First place in school competition' },
  { id: '4', name: 'Competition Participant', tokens: 10, description: 'Participation in school competition' },
  { id: '5', name: 'Perfect Attendance (Week)', tokens: 15, description: 'No absences for a full week' },
  { id: '6', name: 'Homework Completion', tokens: 2, description: 'Submitting homework on time' },
];

// Mock leaderboard data
const generateLeaderboard = (students: any[]) => {
  return students
    .map(student => ({
      ...student,
      tokens: Math.floor(Math.random() * 500) + 50,
      rank: 0,
    }))
    .sort((a, b) => b.tokens - a.tokens)
    .map((student, idx) => ({ ...student, rank: idx + 1 }));
};

// Mock redemptions
const mockRedemptions = [
  { id: '1', studentName: 'Aziza Karimova', reward: 'School Bag', tokens: 200, date: '2024-12-28', status: 'pending' },
  { id: '2', studentName: 'Bobur Toshmatov', reward: 'Notebook', tokens: 50, date: '2024-12-27', status: 'approved' },
  { id: '3', studentName: 'Charos Umarova', reward: 'Extra Break Time', tokens: 100, date: '2024-12-26', status: 'pending' },
  { id: '4', studentName: 'Davron Salimov', reward: 'Pencil Set', tokens: 30, date: '2024-12-25', status: 'rejected' },
];

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddRewardOpen, setIsAddRewardOpen] = useState(false);
  const [isEditRewardOpen, setIsEditRewardOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [tokenRules, setTokenRules] = useState(defaultTokenRules);
  const [redemptions, setRedemptions] = useState(mockRedemptions);
  const [leaderboardTab, setLeaderboardTab] = useState('school');

  const { data: rewards, isLoading: rewardsLoading } = useRewards();
  const { data: students } = useStudents();

  const leaderboard = students ? generateLeaderboard(students) : [];

  const handleAddReward = () => {
    toast.success('Reward added successfully');
    setIsAddRewardOpen(false);
  };

  const handleEditReward = () => {
    toast.success('Reward updated successfully');
    setIsEditRewardOpen(false);
    setSelectedReward(null);
  };

  const handleDeleteReward = () => {
    toast.success('Reward deleted successfully');
    setIsDeleteDialogOpen(false);
    setSelectedReward(null);
  };

  const handleApproveRedemption = (id: string) => {
    setRedemptions(redemptions.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    toast.success('Redemption approved');
  };

  const handleRejectRedemption = (id: string) => {
    setRedemptions(redemptions.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    toast.success('Redemption rejected');
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="page-container">
      <PageHeader 
        title="Tokens & Rewards" 
        description="Manage student rewards, tokens, and redemptions"
      >
        <Button onClick={() => setIsAddRewardOpen(true)} className="btn-gradient">
          <Plus className="h-4 w-4 mr-2" />
          Add Reward
        </Button>
      </PageHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="rules">Token Rules</TabsTrigger>
          <TabsTrigger value="shop">Rewards Shop</TabsTrigger>
          <TabsTrigger value="redemptions">Redemptions</TabsTrigger>
        </TabsList>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard">
          <Tabs value={leaderboardTab} onValueChange={setLeaderboardTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="school">School</TabsTrigger>
              <TabsTrigger value="class">By Class</TabsTrigger>
            </TabsList>

            <TabsContent value="school">
              {/* Top 3 Highlight */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {leaderboard.slice(0, 3).map((student, idx) => (
                  <div 
                    key={student.id} 
                    className={`card-elevated p-6 text-center ${idx === 0 ? 'ring-2 ring-yellow-400 bg-gradient-to-b from-yellow-50 to-card' : ''}`}
                  >
                    <div className="flex justify-center mb-3">
                      {getRankIcon(student.rank)}
                    </div>
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <span className="text-2xl font-bold text-primary">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg">{student.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{student.class}</p>
                    <div className="flex items-center justify-center gap-1 text-primary">
                      <Star className="h-4 w-4 fill-primary" />
                      <span className="font-bold text-xl">{student.tokens}</span>
                      <span className="text-sm">tokens</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rest of Leaderboard */}
              <div className="card-elevated overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Rank</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Class</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Tokens</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.slice(3).map((student) => (
                        <tr key={student.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                          <td className="px-4 py-4">
                            <span className="font-bold text-muted-foreground">#{student.rank}</span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary">
                                  {student.name.charAt(0)}
                                </span>
                              </div>
                              <span className="font-medium">{student.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-muted-foreground">{student.class}</td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex items-center justify-end gap-1 text-primary">
                              <Star className="h-4 w-4 fill-primary" />
                              <span className="font-bold">{student.tokens}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="class">
              <EmptyState
                title="Class Leaderboard"
                description="Select a class to view the leaderboard"
              />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Token Rules Tab */}
        <TabsContent value="rules">
          <div className="card-elevated p-6">
            <h3 className="font-semibold text-lg mb-4">Token Rules Configuration</h3>
            <div className="space-y-4">
              {tokenRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <h4 className="font-medium">{rule.name}</h4>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="h-4 w-4 fill-primary" />
                      <span className="font-bold text-lg">{rule.tokens}</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
          </div>
        </TabsContent>

        {/* Rewards Shop Tab */}
        <TabsContent value="shop">
          {rewardsLoading ? (
            <DataTableSkeleton />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {rewards?.map((reward) => (
                <div key={reward.id} className="card-elevated p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Gift className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => { setSelectedReward(reward); setIsEditRewardOpen(true); }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => { setSelectedReward(reward); setIsDeleteDialogOpen(true); }}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{reward.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="h-4 w-4 fill-primary" />
                      <span className="font-bold">{reward.tokenCost}</span>
                      <span className="text-sm">tokens</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Stock: {reward.stock}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Redemptions Tab */}
        <TabsContent value="redemptions">
          <div className="card-elevated overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Reward</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Tokens</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {redemptions.map((redemption) => (
                    <tr key={redemption.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">
                              {redemption.studentName.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium">{redemption.studentName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm">{redemption.reward}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 text-primary">
                          <Star className="h-4 w-4 fill-primary" />
                          <span className="font-medium">{redemption.tokens}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{redemption.date}</td>
                      <td className="px-4 py-4">
                        <StatusBadge 
                          status={redemption.status === 'approved' ? 'success' : redemption.status === 'rejected' ? 'error' : 'warning'}
                        >
                          {redemption.status}
                        </StatusBadge>
                      </td>
                      <td className="px-4 py-4 text-right">
                        {redemption.status === 'pending' && (
                          <div className="flex justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-success hover:text-success"
                              onClick={() => handleApproveRedemption(redemption.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleRejectRedemption(redemption.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Reward Modal */}
      <Dialog open={isAddRewardOpen} onOpenChange={setIsAddRewardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Reward</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Reward Name</Label>
              <Input placeholder="e.g., School Bag" />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea placeholder="Describe the reward..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Token Cost</Label>
                <Input type="number" placeholder="100" />
              </div>
              <div className="grid gap-2">
                <Label>Stock</Label>
                <Input type="number" placeholder="50" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRewardOpen(false)}>Cancel</Button>
            <Button onClick={handleAddReward} className="btn-gradient">Add Reward</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Reward Modal */}
      <Dialog open={isEditRewardOpen} onOpenChange={setIsEditRewardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Reward</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Reward Name</Label>
              <Input placeholder="e.g., School Bag" defaultValue={selectedReward?.name} />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea placeholder="Describe the reward..." defaultValue={selectedReward?.description} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Token Cost</Label>
                <Input type="number" defaultValue={selectedReward?.tokenCost} />
              </div>
              <div className="grid gap-2">
                <Label>Stock</Label>
                <Input type="number" defaultValue={selectedReward?.stock} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRewardOpen(false)}>Cancel</Button>
            <Button onClick={handleEditReward} className="btn-gradient">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Reward</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedReward?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteReward} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
