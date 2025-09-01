"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  Play,
  GitBranch,
  GitCommit,
  GitMerge,
  CheckCircle,
  Sparkles,
  Upload,
  Tag,
  Archive,
  Settings,
  Search,
  Heart,
  History,
  Compass as Compare,
  Copy,
  Check,
  Loader2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GitCommand {
  id: string
  command: string
  description: string
  example: string
  output: string
  icon: React.ReactNode
}

interface GitCategory {
  title: string
  icon: React.ReactNode
  commands: GitCommand[]
}

const gitCategories: GitCategory[] = [
  {
    title: "Inicialização e Clonagem",
    icon: <GitBranch className="w-5 h-5" />,
    commands: [
      {
        id: "init",
        command: "git init",
        description: "Cria um novo repositório Git local",
        example: "git init",
        output: "Initialized empty Git repository in /path/to/project/.git/",
        icon: <GitBranch className="w-4 h-4" />,
      },
      {
        id: "clone",
        command: "git clone [url]",
        description: "Clona um repositório remoto para sua máquina",
        example: "git clone https://github.com/user/repo.git",
        output:
          "Cloning into 'repo'...\nremote: Enumerating objects: 100, done.\nReceiving objects: 100% (100/100), done.",
        icon: <GitBranch className="w-4 h-4" />,
      },
      {
        id: "clone-b",
        command: "git clone -b [branch] [url]",
        description: "Clona uma branch específica",
        example: "git clone -b develop https://github.com/user/repo.git",
        output:
          "Cloning into 'repo'...\nremote: Enumerating objects: 100, done.\nReceiving objects: 100% (100/100), done.\nSwitched to branch 'develop'",
        icon: <GitBranch className="w-4 h-4" />,
      },
      {
        id: "remote-v",
        command: "git remote -v",
        description: "Lista os repositórios remotos configurados",
        example: "git remote -v",
        output: "origin	https://github.com/user/repo.git (fetch)\norigin	https://github.com/user/repo.git (push)",
        icon: <GitBranch className="w-4 h-4" />,
      },
      {
        id: "remote-add",
        command: "git remote add [nome] [url]",
        description: "Adiciona um repositório remoto",
        example: "git remote add origin https://github.com/user/repo.git",
        output: "# Repositório remoto 'origin' adicionado",
        icon: <GitBranch className="w-4 h-4" />,
      },
      {
        id: "remote-remove",
        command: "git remote remove [nome]",
        description: "Remove um repositório remoto",
        example: "git remote remove origin",
        output: "# Repositório remoto 'origin' removido",
        icon: <GitBranch className="w-4 h-4" />,
      },
      {
        id: "fetch",
        command: "git fetch",
        description: "Baixa alterações do remoto sem fazer merge",
        example: "git fetch origin",
        output:
          "remote: Enumerating objects: 5, done.\nFrom https://github.com/user/repo\n   1a2b3c4..5d6e7f8  main     -> origin/main",
        icon: <GitBranch className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Rastreamento e Staging",
    icon: <GitCommit className="w-5 h-5" />,
    commands: [
      {
        id: "status",
        command: "git status",
        description: "Mostra o estado atual do diretório e arquivos",
        example: "git status",
        output: "On branch main\nChanges to be committed:\n  modified: index.html\n  new file: style.css",
        icon: <GitCommit className="w-4 h-4" />,
      },
      {
        id: "add",
        command: "git add [arquivo]",
        description: "Adiciona um arquivo específico ao stage",
        example: "git add index.html",
        output: "# Arquivo 'index.html' adicionado ao stage",
        icon: <GitCommit className="w-4 h-4" />,
      },
      {
        id: "add-all",
        command: "git add .",
        description: "Adiciona todos os arquivos modificados ao stage",
        example: "git add .",
        output: "# Todos os arquivos modificados foram adicionados ao stage",
        icon: <GitCommit className="w-4 h-4" />,
      },
      {
        id: "restore",
        command: "git restore [arquivo]",
        description: "Remove alterações de um arquivo não commitado",
        example: "git restore index.html",
        output: "# Alterações em 'index.html' restauradas",
        icon: <GitCommit className="w-4 h-4" />,
      },
      {
        id: "restore-staged",
        command: "git restore --staged [arquivo]",
        description: "Remove arquivo do stage sem perder alterações",
        example: "git restore --staged index.html",
        output: "# 'index.html' removido do stage, alterações preservadas",
        icon: <GitCommit className="w-4 h-4" />,
      },
      {
        id: "reset-file",
        command: "git reset [arquivo]",
        description: "Remove arquivo do stage",
        example: "git reset index.html",
        output: "# 'index.html' removido do stage",
        icon: <GitCommit className="w-4 h-4" />,
      },
      {
        id: "rm",
        command: "git rm [arquivo]",
        description: "Remove arquivo do stage e do diretório",
        example: "git rm index.html",
        output: "rm 'index.html'",
        icon: <GitCommit className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Commits",
    icon: <GitCommit className="w-5 h-5" />,
    commands: [
      {
        id: "commit",
        command: "git commit -m [mensagem]",
        description: "Salva alterações no histórico",
        example: 'git commit -m "Adiciona nova função"',
        output: "[main 1a2b3c4] Adiciona nova função\n 1 file changed, 10 insertions(+), 2 deletions(-)",
        icon: <GitCommit className="w-4 h-4" />,
      },
      {
        id: "commit-amend",
        command: "git commit --amend",
        description: "Modifica o último commit",
        example: 'git commit --amend -m "Mensagem atualizada"',
        output:
          "[main 5d6e7f8] Mensagem atualizada\n Date: Fri Aug 30 10:00:00 2025 +0000\n 1 file changed, 5 insertions(+)",
        icon: <GitCommit className="w-4 h-4" />,
      },
      {
        id: "log",
        command: "git log",
        description: "Exibe histórico completo de commits",
        example: "git log",
        output:
          "commit 1a2b3c4 (HEAD -> main)\nAuthor: User <user@example.com>\nDate:   Fri Aug 30 10:00:00 2025 +0000\n\n    Adiciona nova função",
        icon: <GitCommit className="w-4 h-4" />,
      },
      {
        id: "log-oneline",
        command: "git log --oneline",
        description: "Histórico resumido",
        example: "git log --oneline",
        output: "1a2b3c4 Adiciona nova função\n5d6e7f8 Corrige bug",
        icon: <GitCommit className="w-4 h-4" />,
      },
      {
        id: "log-graph",
        command: "git log --graph --decorate --all",
        description: "Visualiza histórico de forma gráfica",
        example: "git log --graph --decorate --all",
        output: "* 1a2b3c4 (HEAD -> main, origin/main) Adiciona nova função\n* 5d6e7f8 Corrige bug",
        icon: <GitCommit className="w-4 h-4" />,
      },
      {
        id: "diff",
        command: "git diff",
        description: "Mostra diferenças entre arquivos e stage",
        example: "git diff",
        output:
          "diff --git a/index.html b/index.html\nindex 123abc..def456\n--- a/index.html\n+++ b/index.html\n@@ -1 +1 @@\n-Hello\n+Hello World",
        icon: <GitCommit className="w-4 h-4" />,
      },
      {
        id: "diff-staged",
        command: "git diff --staged",
        description: "Mostra diferenças já no stage",
        example: "git diff --staged",
        output:
          "diff --git a/style.css b/style.css\nindex 789ghi..jkl012\n--- a/style.css\n+++ b/style.css\n@@ -1 +1,2 @@\nbody { background: white; }\n+body { background: blue; }",
        icon: <GitCommit className="w-4 h-4" />,
      },
      {
        id: "revert",
        command: "git revert [commit_id]",
        description: "Desfaz um commit sem alterar o histórico",
        example: "git revert 1a2b3c",
        output: '[main 3c4d5e6] Revert "Adiciona nova função"\n 1 file changed, 2 insertions(+), 10 deletions(-)',
        icon: <GitCommit className="w-4 h-4" />,
      },
      {
        id: "cherry-pick",
        command: "git cherry-pick [commit_id]",
        description: "Aplica commit específico em outra branch",
        example: "git cherry-pick 1a2b3c",
        output:
          "[main 7f8g9h0] Adiciona nova função\n Date: Fri Aug 30 10:00:00 2025 +0000\n 1 file changed, 10 insertions(+), 2 deletions(-)",
        icon: <GitCommit className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Branches",
    icon: <GitMerge className="w-5 h-5" />,
    commands: [
      {
        id: "branch-list",
        command: "git branch",
        description: "Lista todas as branches",
        example: "git branch",
        output: "* main\n  feature/login\n  develop",
        icon: <GitMerge className="w-4 h-4" />,
      },
      {
        id: "branch",
        command: "git branch [nome]",
        description: "Cria nova branch",
        example: "git branch feature/login",
        output: "# Branch 'feature/login' criada",
        icon: <GitMerge className="w-4 h-4" />,
      },
      {
        id: "branch-d",
        command: "git branch -d [nome]",
        description: "Deleta branch local",
        example: "git branch -d feature/login",
        output: "Deleted branch feature/login (was 1a2b3c4).",
        icon: <GitMerge className="w-4 h-4" />,
      },
      {
        id: "branch-D",
        command: "git branch -D [nome]",
        description: "Força exclusão da branch",
        example: "git branch -D feature/login",
        output: "Deleted branch feature/login (was 1a2b3c4).",
        icon: <GitMerge className="w-4 h-4" />,
      },
      {
        id: "checkout",
        command: "git checkout [branch]",
        description: "Troca para outra branch",
        example: "git checkout feature/login",
        output: "Switched to branch 'feature/login'",
        icon: <GitMerge className="w-4 h-4" />,
      },
      {
        id: "checkout-b",
        command: "git checkout -b [branch]",
        description: "Cria e troca para nova branch",
        example: "git checkout -b feature/signup",
        output: "Switched to a new branch 'feature/signup'",
        icon: <GitMerge className="w-4 h-4" />,
      },
      {
        id: "merge",
        command: "git merge [branch]",
        description: "Mescla branch com a atual",
        example: "git merge feature/login",
        output:
          "Updating a1b2c3d..e4f5g6h\nFast-forward\n login.html | 25 +++++++++++++++++++++++++\n 1 file changed, 25 insertions(+)",
        icon: <GitMerge className="w-4 h-4" />,
      },
      {
        id: "rebase",
        command: "git rebase [branch]",
        description: "Reaplica commits da branch atual em outra base",
        example: "git rebase main",
        output: "Successfully rebased and updated refs/heads/feature/login.",
        icon: <GitMerge className="w-4 h-4" />,
      },
      {
        id: "branch-merged",
        command: "git branch --merged",
        description: "Lista branches já mescladas",
        example: "git branch --merged",
        output: "* main\n  feature/login",
        icon: <GitMerge className="w-4 h-4" />,
      },
      {
        id: "branch-no-merged",
        command: "git branch --no-merged",
        description: "Lista branches não mescladas",
        example: "git branch --no-merged",
        output: "  develop\n  feature/signup",
        icon: <GitMerge className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Remoto",
    icon: <Upload className="w-5 h-5" />,
    commands: [
      {
        id: "pull",
        command: "git pull",
        description: "Atualiza repositório local com remoto",
        example: "git pull origin main",
        output:
          "From https://github.com/user/repo\n   1a2b3c4..5d6e7f8  main     -> origin/main\nUpdating 1a2b3c4..5d6e7f8\nFast-forward\n file.txt | 1 +\n 1 file changed, 1 insertion(+)",
        icon: <Upload className="w-4 h-4" />,
      },
      {
        id: "push",
        command: "git push",
        description: "Envia alterações para remoto",
        example: "git push origin main",
        output: "To https://github.com/user/repo.git\n   1a2b3c4..5d6e7f8  main -> main",
        icon: <Upload className="w-4 h-4" />,
      },
      {
        id: "push-u",
        command: "git push -u origin [branch]",
        description: "Envia e define branch como upstream",
        example: "git push -u origin feature/login",
        output:
          "Branch 'feature/login' set up to track remote branch 'feature/login' from 'origin'.\nTo https://github.com/user/repo.git\n * [new branch]      feature/login -> feature/login",
        icon: <Upload className="w-4 h-4" />,
      },
      {
        id: "push-delete",
        command: "git push origin --delete [branch]",
        description: "Remove branch remota",
        example: "git push origin --delete feature/login",
        output: "To https://github.com/user/repo.git\n - [deleted]         feature/login",
        icon: <Upload className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Tags",
    icon: <Tag className="w-5 h-5" />,
    commands: [
      {
        id: "tag-create",
        command: "git tag [nome_tag]",
        description: "Cria tag",
        example: "git tag v1.0",
        output: "# Tag 'v1.0' criada",
        icon: <Tag className="w-4 h-4" />,
      },
      {
        id: "tag-list",
        command: "git tag",
        description: "Lista todas as tags",
        example: "git tag",
        output: "v1.0\nv1.1\nv2.0",
        icon: <Tag className="w-4 h-4" />,
      },
      {
        id: "tag-show",
        command: "git show [tag]",
        description: "Mostra detalhes da tag",
        example: "git show v1.0",
        output:
          "tag v1.0\nTagger: User <user@example.com>\nDate: Fri Aug 30 10:00:00 2025 +0000\n\ncommit 1a2b3c4\nAuthor: User <user@example.com>\n\n    Versão inicial",
        icon: <Tag className="w-4 h-4" />,
      },
      {
        id: "tag-push",
        command: "git push origin [tag]",
        description: "Envia tag para remoto",
        example: "git push origin v1.0",
        output: "To https://github.com/user/repo.git\n * [new tag]         v1.0 -> v1.0",
        icon: <Tag className="w-4 h-4" />,
      },
      {
        id: "tag-push-all",
        command: "git push origin --tags",
        description: "Envia todas as tags",
        example: "git push origin --tags",
        output:
          "To https://github.com/user/repo.git\n * [new tag]         v1.0 -> v1.0\n * [new tag]         v1.1 -> v1.1",
        icon: <Tag className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Stash",
    icon: <Archive className="w-5 h-5" />,
    commands: [
      {
        id: "stash",
        command: "git stash",
        description: "Guarda alterações temporariamente",
        example: "git stash",
        output: "Saved working directory and index state WIP on main: 1a2b3c4 Adiciona nova função",
        icon: <Archive className="w-4 h-4" />,
      },
      {
        id: "stash-list",
        command: "git stash list",
        description: "Lista alterações guardadas",
        example: "git stash list",
        output: "stash@{0}: WIP on main: 1a2b3c4 Adiciona nova função\nstash@{1}: WIP on develop: 5d6e7f8 Corrige bug",
        icon: <Archive className="w-4 h-4" />,
      },
      {
        id: "stash-apply",
        command: "git stash apply",
        description: "Aplica alterações do stash",
        example: "git stash apply",
        output: "On branch main\nChanges not staged for commit:\n  modified:   index.html",
        icon: <Archive className="w-4 h-4" />,
      },
      {
        id: "stash-pop",
        command: "git stash pop",
        description: "Aplica e remove do stash",
        example: "git stash pop",
        output:
          "On branch main\nChanges not staged for commit:\n  modified:   index.html\nDropped refs/stash@{0} (123abc)",
        icon: <Archive className="w-4 h-4" />,
      },
      {
        id: "stash-drop",
        command: "git stash drop",
        description: "Remove stash específico",
        example: "git stash drop stash@{0}",
        output: "Dropped stash@{0} (123abc)",
        icon: <Archive className="w-4 h-4" />,
      },
      {
        id: "stash-clear",
        command: "git stash clear",
        description: "Limpa todos os stashes",
        example: "git stash clear",
        output: "# Todos os stashes removidos",
        icon: <Archive className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Configurações",
    icon: <Settings className="w-5 h-5" />,
    commands: [
      {
        id: "config-name",
        command: 'git config --global user.name "[nome]"',
        description: "Configura nome do usuário global",
        example: 'git config --global user.name "Lucas Andrade"',
        output: "# Nome de usuário configurado como 'Lucas Andrade'",
        icon: <Settings className="w-4 h-4" />,
      },
      {
        id: "config-email",
        command: 'git config --global user.email "[email]"',
        description: "Configura email global",
        example: "git config --global user.email lucas@example.com",
        output: "# Email configurado como 'lucas@example.com'",
        icon: <Settings className="w-4 h-4" />,
      },
      {
        id: "config-list",
        command: "git config --list",
        description: "Lista configurações",
        example: "git config --list",
        output: "user.name=Lucas Andrade\nuser.email=lucas@example.com\ncore.editor=vim",
        icon: <Settings className="w-4 h-4" />,
      },
      {
        id: "config-editor",
        command: 'git config --global core.editor "[editor]"',
        description: "Define editor padrão",
        example: 'git config --global core.editor "vim"',
        output: "# Editor padrão configurado como 'vim'",
        icon: <Settings className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Outros comandos avançados",
    icon: <Sparkles className="w-5 h-5" />,
    commands: [
      {
        id: "show-commit",
        command: "git show [commit_id]",
        description: "Mostra detalhes de um commit",
        example: "git show 1a2b3c",
        output:
          "commit 1a2b3c4\nAuthor: User <user@example.com>\nDate:   Fri Aug 30 10:00:00 2025 +0000\n\n    Adiciona nova função\ndiff --git a/file.txt b/file.txt\nindex 123abc..def456\n--- a/file.txt\n+++ b/file.txt\n@@ -1 +1,2 @@\n Hello\n+World",
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        id: "bisect",
        command: "git bisect",
        description: "Localiza commit que causou bug",
        example: "git bisect start",
        output: "# Bisect iniciado. Use git bisect good/bad para marcar commits.",
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        id: "blame",
        command: "git blame [arquivo]",
        description: "Mostra autoria linha a linha",
        example: "git blame index.html",
        output:
          "1a2b3c4 (User 2025-08-30 10:00:00 +0000 1) <html>\n5d6e7f8 (User 2025-08-30 11:00:00 +0000 2) <body>Hello World</body>",
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        id: "clean",
        command: "git clean -f",
        description: "Remove arquivos não rastreados",
        example: "git clean -f",
        output: "Removing temp.txt\nRemoving backup/",
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        id: "reflog",
        command: "git reflog",
        description: "Mostra histórico de HEADs",
        example: "git reflog",
        output:
          "1a2b3c4 HEAD@{0}: commit: Adiciona nova função\n5d6e7f8 HEAD@{1}: checkout: moving from develop to main",
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        id: "tag-annotated",
        command: 'git tag -a [tag] -m "[mensagem]"',
        description: "Cria tag anotada",
        example: 'git tag -a v1.0 -m "Versão inicial"',
        output: "# Tag anotada 'v1.0' criada",
        icon: <Sparkles className="w-4 h-4" />,
      },
      {
        id: "archive",
        command: "git archive",
        description: "Cria arquivo zip/tar do repositório",
        example: "git archive -o v1.0.zip HEAD",
        output: "# Arquivo 'v1.0.zip' criado com o conteúdo do repositório",
        icon: <Sparkles className="w-4 h-4" />,
      },
    ],
  },
]

export default function GitGuide() {
  const [expandedCommand, setExpandedCommand] = useState<string | null>(null)
  const [expandedFavoriteCommand, setExpandedFavoriteCommand] = useState<string | null>(null)
  const [simulatingCommand, setSimulatingCommand] = useState<string | null>(null)
  const [executedSimulations, setExecutedSimulations] = useState<Map<string, boolean>>(new Map())
  const [favoriteTerminalStates, setFavoriteTerminalStates] = useState<
    Map<
      string,
      {
        text: string
        step: "typing" | "executing" | "complete"
        showCursor: boolean
      }
    >
  >(new Map())
  const [terminalStates, setTerminalStates] = useState<
    Map<
      string,
      {
        text: string
        step: "typing" | "executing" | "complete"
        showCursor: boolean
      }
    >
  >(new Map())

  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [showComparator, setShowComparator] = useState(false)
  const [compareCommands, setCompareCommands] = useState<GitCommand[]>([])
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    const savedFavorites = localStorage.getItem("git-guide-favorites")
    const savedHistory = localStorage.getItem("git-guide-history")

    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)))
    }
    if (savedHistory) {
      setCommandHistory(JSON.parse(savedHistory))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("git-guide-favorites", JSON.stringify(Array.from(favorites)))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("git-guide-history", JSON.stringify(commandHistory))
  }, [commandHistory])

  const filteredCategories = gitCategories
    .map((category) => ({
      ...category,
      commands: category.commands.filter(
        (cmd) =>
          searchQuery === "" ||
          cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cmd.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.commands.length > 0)

  const handleCommandClick = (commandId: string) => {
    if (expandedCommand === commandId) {
      setExpandedCommand(null)
      setExecutedSimulations((prev) => {
        const newMap = new Map(prev)
        newMap.delete(commandId)
        return newMap
      })
      setTerminalStates((prev) => {
        const newMap = new Map(prev)
        newMap.delete(commandId)
        return newMap
      })
    } else {
      setExpandedCommand(commandId)
      addToHistory(commandId)
    }
  }

  const handleFavoriteCommandClick = (commandId: string) => {
    const favoriteCommandId = `fav-${commandId}`
    if (expandedFavoriteCommand === favoriteCommandId) {
      setExpandedFavoriteCommand(null)
      setExecutedSimulations((prev) => {
        const newMap = new Map(prev)
        newMap.delete(favoriteCommandId)
        return newMap
      })
      setFavoriteTerminalStates((prev) => {
        const newMap = new Map(prev)
        newMap.delete(favoriteCommandId)
        return newMap
      })
    } else {
      setExpandedFavoriteCommand(favoriteCommandId)
      addToHistory(commandId)
    }
  }

  const addToHistory = (commandId: string) => {
    setCommandHistory((prev) => {
      const newHistory = prev.filter((id) => id !== commandId)
      return [commandId, ...newHistory].slice(0, 10)
    })
  }

  const simulateCommand = async (command: string, output: string, commandId: string) => {
    if (simulatingCommand) return

    setSimulatingCommand(commandId)

    const isFavoriteCommand = commandId.startsWith("fav-")
    const stateUpdater = isFavoriteCommand ? setFavoriteTerminalStates : setTerminalStates

    stateUpdater(
      (prev) =>
        new Map(
          prev.set(commandId, {
            text: "",
            step: "typing",
            showCursor: true,
          }),
        ),
    )

    // Typing animation
    for (let i = 0; i <= command.length; i++) {
      stateUpdater(
        (prev) =>
          new Map(
            prev.set(commandId, {
              text: command.slice(0, i),
              step: "typing",
              showCursor: true,
            }),
          ),
      )
      await new Promise((resolve) => setTimeout(resolve, 50))
    }

    stateUpdater(
      (prev) =>
        new Map(
          prev.set(commandId, {
            text: command,
            step: "executing",
            showCursor: false,
          }),
        ),
    )
    await new Promise((resolve) => setTimeout(resolve, 800))

    stateUpdater(
      (prev) =>
        new Map(
          prev.set(commandId, {
            text: command,
            step: "complete",
            showCursor: false,
          }),
        ),
    )

    setExecutedSimulations((prev) => new Map(prev.set(commandId, true)))
    setSimulatingCommand(null)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCommand(text)
      setTimeout(() => setCopiedCommand(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const toggleFavorite = (commandId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(commandId)) {
        newFavorites.delete(commandId)
      } else {
        newFavorites.add(commandId)
      }
      return newFavorites
    })
  }

  const addToCompare = (command: GitCommand) => {
    if (compareCommands.length < 2 && !compareCommands.find((cmd) => cmd.id === command.id)) {
      setCompareCommands((prev) => [...prev, command])
    }
  }

  const removeFromCompare = (commandId: string) => {
    setCompareCommands((prev) => prev.filter((cmd) => cmd.id !== commandId))
  }

  const getFavoriteCommands = () => {
    const favoriteCommands: GitCommand[] = []
    gitCategories.forEach((category) => {
      category.commands.forEach((cmd) => {
        if (favorites.has(cmd.id)) {
          favoriteCommands.push(cmd)
        }
      })
    })
    return favoriteCommands
  }

  const TerminalAnimation = ({
    command,
    output,
    commandId,
  }: { command: string; output: string; commandId: string }) => {
    const isFavoriteCommand = commandId.startsWith("fav-")
    const terminalState = (isFavoriteCommand ? favoriteTerminalStates : terminalStates).get(commandId) || {
      text: "",
      step: "typing" as const,
      showCursor: true,
    }

    return (
      <div className="mt-6">
        <div className="bg-slate-950/80 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-xs text-slate-400 font-mono">Terminal</span>
          </div>
          <div className="p-4 font-mono text-sm">
            <div className="flex items-center mb-2">
              <span className="text-green-400 mr-2">$</span>
              <span className="text-white">{terminalState.text}</span>
              {terminalState.showCursor && terminalState.step === "typing" && (
                <span className="inline-block w-2 h-5 bg-green-400 ml-1 animate-pulse"></span>
              )}
            </div>
            {terminalState.step === "complete" && (
              <div className="text-slate-300 whitespace-pre-wrap text-left">{output}</div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.12)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(139,92,246,0.12)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(59,130,246,0.08)_0%,_transparent_50%)] pointer-events-none" />

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl mb-6 backdrop-blur-sm border border-blue-500/20 shadow-lg shadow-blue-500/10">
                <GitBranch className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                Guia Git Interativo
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
                Aprenda Git de forma prática com simulações interativas e exemplos reais
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
              <input
                type="text"
                placeholder="Pesquisar comandos Git..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-slate-900/30 backdrop-blur-md border border-slate-700/30 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg shadow-slate-900/20"
                style={{
                  background: "rgba(15, 23, 42, 0.4)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12 px-4">
            <Button
              variant="outline"
              onClick={() => setShowFavorites(!showFavorites)}
              className={`transition-all duration-300 backdrop-blur-md border-0 shadow-lg ${
                showFavorites
                  ? "bg-red-500/20 text-red-400 shadow-red-500/20"
                  : "bg-slate-800/30 text-slate-300 hover:text-white hover:bg-slate-700/40 shadow-slate-900/20"
              }`}
              style={{
                background: showFavorites ? "rgba(239, 68, 68, 0.15)" : "rgba(30, 41, 59, 0.4)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(148, 163, 184, 0.1)",
              }}
            >
              <Heart className={`w-4 h-4 mr-2 ${showFavorites ? "fill-current" : ""}`} />
              <span className="hidden sm:inline">Favoritos</span> ({favorites.size})
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowHistory(!showHistory)}
              className={`transition-all duration-300 backdrop-blur-md border-0 shadow-lg ${
                showHistory
                  ? "bg-blue-500/20 text-blue-400 shadow-blue-500/20"
                  : "bg-slate-800/30 text-slate-300 hover:text-white hover:bg-slate-700/40 shadow-slate-900/20"
              }`}
              style={{
                background: showHistory ? "rgba(59, 130, 246, 0.15)" : "rgba(30, 41, 59, 0.4)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(148, 163, 184, 0.1)",
              }}
            >
              <History className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Histórico</span> ({commandHistory.length})
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowComparator(!showComparator)}
              className={`transition-all duration-300 backdrop-blur-md border-0 shadow-lg ${
                showComparator
                  ? "bg-green-500/20 text-green-400 shadow-green-500/20"
                  : "bg-slate-800/30 text-slate-300 hover:text-white hover:bg-slate-700/40 shadow-slate-900/20"
              }`}
              style={{
                background: showComparator ? "rgba(34, 197, 94, 0.15)" : "rgba(30, 41, 59, 0.4)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(148, 163, 184, 0.1)",
              }}
            >
              <Compare className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Comparar</span> ({compareCommands.length}/2)
            </Button>
          </div>

          {showComparator && (
            <div
              className="max-w-6xl mx-auto mb-8 sm:mb-12 p-4 sm:p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 shadow-lg mx-4"
              style={{
                background: "rgba(15, 23, 42, 0.4)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
              }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-400">
                <Compare className="w-6 h-6" />
                Comparador de Comandos
              </h2>

              {compareCommands.length === 0 ? (
                <p className="text-center py-8 text-slate-400">
                  Clique no ícone de comparação nos comandos para adicionar até 2 comandos para comparar!
                </p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {compareCommands.map((cmd, index) => (
                    <div key={cmd.id} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Comando {index + 1}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCompare(cmd.id)}
                          className="text-slate-400 hover:text-red-400"
                        >
                          ✕
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <span className="text-blue-400 font-mono text-sm">{cmd.command}</span>
                        </div>
                        <div>
                          <span className="text-slate-300 text-sm">{cmd.description}</span>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <span className="text-green-400 text-xs">Exemplo:</span>
                          <div className="text-slate-300 font-mono text-sm mt-1">{cmd.example}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {showFavorites && (
            <div className="max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white">Comandos Favoritos</h2>
              {getFavoriteCommands().length === 0 ? (
                <div
                  className="text-center py-12 px-4 rounded-2xl backdrop-blur-md border shadow-lg"
                  style={{
                    background: "rgba(15, 23, 42, 0.4)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(148, 163, 184, 0.2)",
                  }}
                >
                  <Heart className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">Nenhum comando favoritado ainda</p>
                  <p className="text-slate-500 text-sm mt-2">
                    Clique no ❤️ ao lado dos comandos para adicioná-los aos favoritos
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {getFavoriteCommands().map((cmd) => (
                    <Card
                      key={`fav-${cmd.id}`}
                      className="overflow-hidden border-0 transition-all duration-500 backdrop-blur-md shadow-xl group"
                      style={{
                        background: "rgba(15, 23, 42, 0.4)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(148, 163, 184, 0.2)",
                      }}
                    >
                      <CardContent className="p-0">
                        <div
                          className="w-full p-4 sm:p-6 h-auto justify-between transition-all duration-300 font-extralight hover:bg-transparent text-white cursor-pointer flex"
                          onClick={() => handleFavoriteCommandClick(cmd.id)}
                        >
                          <div className="flex items-center gap-3 sm:gap-4 pl-2 sm:pl-4 flex-1 min-w-0">
                            <div className="p-2 rounded-lg transition-all duration-300 bg-blue-500/20 text-blue-400 flex-shrink-0">
                              {cmd.icon}
                            </div>
                            <div className="text-left flex-1 min-w-0">
                              <div className="font-mono text-sm sm:text-lg font-medium transition-all duration-300 text-blue-300 truncate">
                                {cmd.command}
                              </div>
                              <div className="text-xs sm:text-sm transition-all duration-300 text-slate-400 line-clamp-2">
                                {cmd.description}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 sm:gap-2 pr-2 sm:pr-4 flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation()
                                toggleFavorite(cmd.id)
                              }}
                              className={`p-1 sm:p-2 transition-all duration-300 ${
                                favorites.has(cmd.id)
                                  ? "text-red-400 hover:text-red-300"
                                  : "text-slate-400 hover:text-slate-300"
                              }`}
                            >
                              <Heart
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${favorites.has(cmd.id) ? "fill-current" : ""}`}
                              />
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation()
                                addToCompare(cmd)
                              }}
                              disabled={
                                compareCommands.length >= 2 ||
                                compareCommands.find((c) => c.id === cmd.id) !== undefined
                              }
                              className="p-1 sm:p-2 transition-all duration-300 text-slate-400 hover:text-slate-300 disabled:text-slate-600"
                            >
                              <Compare className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>

                            <ChevronDown
                              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                                expandedFavoriteCommand === `fav-${cmd.id}` ? "rotate-180" : ""
                              } text-slate-400`}
                            />
                          </div>
                        </div>

                        {expandedFavoriteCommand === `fav-${cmd.id}` && (
                          <div className="px-4 sm:px-8 pb-6 sm:pb-8 animate-in slide-in-from-top-2 fade-in-50 duration-500">
                            <TerminalAnimation command={cmd.example} output={cmd.output} commandId={`fav-${cmd.id}`} />
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                              <Button
                                onClick={() => copyToClipboard(cmd.command)}
                                variant="outline"
                                size="lg"
                                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 animate-in fade-in-50 slide-in-from-bottom-2 duration-300 delay-200 backdrop-blur-md border-0 shadow-lg shadow-blue-500/20 w-full sm:w-auto"
                                style={{
                                  background: "rgba(59, 130, 246, 0.15)",
                                  backdropFilter: "blur(16px)",
                                  border: "1px solid rgba(148, 163, 184, 0.1)",
                                }}
                              >
                                {copiedCommand === cmd.command ? (
                                  <>
                                    <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    <span className="text-sm sm:text-base font-medium">Copiado!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    <span className="text-sm sm:text-base font-medium">Copiar Comando</span>
                                  </>
                                )}
                              </Button>

                              <Button
                                onClick={() => simulateCommand(cmd.example, cmd.output, `fav-${cmd.id}`)}
                                disabled={
                                  simulatingCommand === `fav-${cmd.id}` || executedSimulations.get(`fav-${cmd.id}`)
                                }
                                variant="outline"
                                size="lg"
                                className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600/20 text-green-300 hover:bg-green-600/30 disabled:bg-slate-600/50 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 animate-in fade-in-50 slide-in-from-bottom-2 duration-300 delay-300 backdrop-blur-md border-0 shadow-lg shadow-green-500/20 disabled:shadow-none w-full sm:w-auto"
                                style={{
                                  background: "rgba(34, 197, 94, 0.15)",
                                  backdropFilter: "blur(16px)",
                                  border: "1px solid rgba(148, 163, 184, 0.1)",
                                }}
                              >
                                {simulatingCommand === `fav-${cmd.id}` ? (
                                  <>
                                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                                    <span className="text-sm sm:text-base font-medium">Simulando...</span>
                                  </>
                                ) : executedSimulations.get(`fav-${cmd.id}`) ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    <span className="text-sm sm:text-base font-medium">Simulado</span>
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    <span className="text-sm sm:text-base font-medium">Simular</span>
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {showHistory && (
            <div className="max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white">Histórico de Comandos</h2>
              {commandHistory.length === 0 ? (
                <div
                  className="text-center py-12 px-4 rounded-2xl backdrop-blur-md border shadow-lg"
                  style={{
                    background: "rgba(15, 23, 42, 0.4)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(148, 163, 184, 0.2)",
                  }}
                >
                  <History className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">Nenhum comando executado ainda</p>
                  <p className="text-slate-500 text-sm mt-2">Execute alguns comandos para vê-los aparecer aqui</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {commandHistory
                    .slice()
                    .reverse()
                    .map((cmd, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl backdrop-blur-md border transition-all duration-300 shadow-lg"
                        style={{
                          background: "rgba(15, 23, 42, 0.4)",
                          backdropFilter: "blur(16px)",
                          border: "1px solid rgba(148, 163, 184, 0.2)",
                        }}
                      >
                        <code className="text-blue-300 font-mono text-sm sm:text-base">{cmd}</code>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {searchQuery && filteredCategories.length === 0 && (
            <div className="max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
              <div
                className="text-center py-12 px-4 rounded-2xl backdrop-blur-md border shadow-lg"
                style={{
                  background: "rgba(15, 23, 42, 0.4)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                }}
              >
                <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">Nenhum comando encontrado</p>
                <p className="text-slate-500 text-sm mt-2">Tente pesquisar com outros termos</p>
              </div>
            </div>
          )}

          {/* Commands Grid */}
          <div className="max-w-6xl mx-auto space-y-12 px-4">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={category.title} className="space-y-6">
                <div className="text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent blur-2xl" />
                  <div
                    className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl backdrop-blur-md border shadow-lg"
                    style={{
                      background: "rgba(15, 23, 42, 0.3)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(148, 163, 184, 0.2)",
                    }}
                  >
                    <div className="text-blue-400">{category.icon}</div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {category.title}
                    </h2>
                  </div>
                </div>

                <div className="grid gap-4 sm:gap-6">
                  {category.commands.map((cmd, cmdIndex) => (
                    <Card
                      key={cmd.id}
                      className="overflow-hidden border-0 transition-all duration-500 backdrop-blur-md shadow-xl group animate-fade-in-up"
                      style={{
                        background: "rgba(15, 23, 42, 0.4)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(148, 163, 184, 0.2)",
                        animationDelay: `${categoryIndex * 0.1 + cmdIndex * 0.05}s`,
                      }}
                    >
                      <CardContent className="p-0">
                        <div
                          className="w-full p-4 sm:p-6 h-auto justify-between transition-all duration-300 font-extralight hover:bg-transparent text-white cursor-pointer flex"
                          onClick={() => handleCommandClick(cmd.id)}
                        >
                          <div className="flex items-center gap-3 sm:gap-4 pl-2 sm:pl-4 flex-1 min-w-0">
                            <div className="p-2 rounded-lg transition-all duration-300 bg-blue-500/20 text-blue-400 flex-shrink-0">
                              {cmd.icon}
                            </div>
                            <div className="text-left flex-1 min-w-0">
                              <div className="font-mono text-sm sm:text-lg font-medium transition-all duration-300 text-blue-300 truncate">
                                {cmd.command}
                              </div>
                              <div className="text-xs sm:text-sm transition-all duration-300 text-slate-400 line-clamp-2">
                                {cmd.description}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 sm:gap-2 pr-2 sm:pr-4 flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation()
                                toggleFavorite(cmd.id)
                              }}
                              className={`p-1 sm:p-2 transition-all duration-300 ${
                                favorites.has(cmd.id)
                                  ? "text-red-400 hover:text-red-300"
                                  : "text-slate-400 hover:text-slate-300"
                              }`}
                            >
                              <Heart
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${favorites.has(cmd.id) ? "fill-current" : ""}`}
                              />
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation()
                                addToCompare(cmd)
                              }}
                              disabled={
                                compareCommands.length >= 2 ||
                                compareCommands.find((c) => c.id === cmd.id) !== undefined
                              }
                              className="p-1 sm:p-2 transition-all duration-300 text-slate-400 hover:text-slate-300 disabled:text-slate-600"
                            >
                              <Compare className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>

                            <ChevronDown
                              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                                expandedCommand === cmd.id ? "rotate-180" : ""
                              } text-slate-400`}
                            />
                          </div>
                        </div>

                        {expandedCommand === cmd.id && (
                          <div className="px-4 sm:px-8 pb-6 sm:pb-8 animate-in slide-in-from-top-2 fade-in-50 duration-500">
                            <TerminalAnimation command={cmd.example} output={cmd.output} commandId={cmd.id} />
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                              <Button
                                variant="outline"
                                size="lg"
                                className={`px-4 sm:px-6 py-2 sm:py-3 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 animate-in fade-in-50 slide-in-from-bottom-2 duration-300 delay-200 backdrop-blur-md border-0 shadow-lg w-full sm:w-auto ${
                                  copiedCommand === cmd.command
                                    ? "bg-blue-600/20 text-blue-300 shadow-blue-500/20"
                                    : "bg-slate-700/30 text-slate-300 hover:bg-slate-600/40 shadow-slate-900/20"
                                }`}
                                style={{
                                  background:
                                    copiedCommand === cmd.command
                                      ? "rgba(59, 130, 246, 0.15)"
                                      : "rgba(51, 65, 85, 0.4)",
                                  backdropFilter: "blur(16px)",
                                  border: "1px solid rgba(148, 163, 184, 0.1)",
                                }}
                                onClick={() => copyToClipboard(cmd.command)}
                              >
                                {copiedCommand === cmd.command ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    Copiado!
                                  </>
                                ) : (
                                  <>
                                    <Archive className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    Copiar Comando
                                  </>
                                )}
                              </Button>

                              <Button
                                variant="outline"
                                size="lg"
                                className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600/20 text-green-300 hover:bg-green-600/30 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 animate-in fade-in-50 slide-in-from-bottom-2 duration-300 delay-300 backdrop-blur-md border-0 shadow-lg shadow-green-500/20 w-full sm:w-auto"
                                style={{
                                  background: "rgba(34, 197, 94, 0.15)",
                                  backdropFilter: "blur(16px)",
                                  border: "1px solid rgba(148, 163, 184, 0.1)",
                                }}
                                onClick={() => simulateCommand(cmd.example, cmd.output, cmd.id)}
                                disabled={simulatingCommand !== null}
                              >
                                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                {executedSimulations.get(cmd.id) ? "Simular Novamente" : "Simular Comando"}
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <footer className="text-center py-6 text-sm text-slate-400">
            Feito por <span className="font-semibold text-white">Lucas Andrade 💙</span> •{" "}
            <a
              href="https://www.instagram.com/valentelucass"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              @valentelucass
            </a>{" "}
            •{" "}
            <a
              href="https://www.linkedin.com/in/dev-lucasandrade/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
          </footer>
        </div>
      </div>
    </div>
  )
}
