"use client";
import React, { useState, useEffect } from 'react';

const mockRecipes = [
  { id: 1, name: 'Chicken Salad', category: 'Lunch', calories: 350, protein: 30, carbs: 20, fats: 12, createdBy: 'Carl Coach' },
  { id: 2, name: 'Oatmeal Bowl', category: 'Breakfast', calories: 250, protein: 8, carbs: 45, fats: 4, createdBy: 'Alice Admin' },
  { id: 3, name: 'Grilled Salmon', category: 'Dinner', calories: 420, protein: 38, carbs: 5, fats: 24, createdBy: 'Carl Coach' },
];

const mockMealPlans = [
  { id: 1, name: 'Weight Loss Plan' },
  { id: 2, name: 'Muscle Gain Plan' },
  { id: 3, name: 'Vegan Plan' },
];

export default function RecipesPage() {
  const [search, setSearch] = useState('');
  const [modalType, setModalType] = useState<'view' | 'edit' | 'create' | 'assign' | 'delete' | 'ai' | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<typeof mockRecipes[0] | null>(null);
  const [assignPlans, setAssignPlans] = useState<string[]>([]);
  const [form, setForm] = useState({ name: '', category: '', calories: '', proteinPct: '', carbsPct: '', fatsPct: '' });
  const [formError, setFormError] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [aiError, setAiError] = useState('');
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [generationsLeft, setGenerationsLeft] = useState(5); // Mock: 5 left this month
  const [aiImageLoading, setAiImageLoading] = useState(false);
  const [aiImageError, setAiImageError] = useState('');
  const [reviewMode, setReviewMode] = useState(false);
  const [editRecipe, setEditRecipe] = useState<any>(null);
  const [dietSuggestions, setDietSuggestions] = useState<string[]>([]);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);

  const filteredRecipes = mockRecipes.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase())
  );

  function openModal(type: typeof modalType, recipe?: typeof mockRecipes[0]) {
    setModalType(type);
    setSelectedRecipe(recipe || null);
    setFormError('');
    if (type === 'edit' && recipe) {
      setForm({
        name: recipe.name,
        category: recipe.category,
        calories: recipe.calories.toString(),
        proteinPct: recipe.protein ? ((recipe.protein / recipe.calories) * 100).toFixed(2) : '',
        carbsPct: recipe.carbs ? ((recipe.carbs / recipe.calories) * 100).toFixed(2) : '',
        fatsPct: recipe.fats ? ((recipe.fats / recipe.calories) * 100).toFixed(2) : '',
      });
    } else if (type === 'create') {
      setForm({ name: '', category: '', calories: '', proteinPct: '', carbsPct: '', fatsPct: '' });
    }
    if (type === 'assign') {
      setAssignPlans([]);
    }
    if (type === 'ai') {
      setAiPrompt('');
      setAiResult(null);
      setAiError('');
    }
  }

  function closeModal() {
    setModalType(null);
    setSelectedRecipe(null);
    setFormError('');
    setAiPrompt('');
    setAiResult(null);
    setAiError('');
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.category.trim() || !form.calories.trim() || !form.proteinPct.trim() || !form.carbsPct.trim() || !form.fatsPct.trim()) {
      setFormError('All fields are required.');
      return;
    }
    setFormError('');
    // TODO: Save logic
    closeModal();
  }

  function handleAssignSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Assign logic
    closeModal();
  }

  function handleDelete() {
    // TODO: Delete logic
    closeModal();
  }

  function togglePlan(planId: string) {
    setAssignPlans((prev) =>
      prev.includes(planId) ? prev.filter((id) => id !== planId) : [...prev, planId]
    );
  }

  async function handleAiSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAiLoading(true);
    setAiError('');
    setAiResult(null);
    try {
      const primedPrompt = `Generate a meal recipe in the following format:\n\n- Name: [Recipe Name]\n- Category: [Breakfast/Lunch/Dinner/Snack]\n- Prep Time: [e.g., 15 minutes]\n- Ingredients: [List each ingredient on a new line]\n- Instructions: [List each step on a new line]\n- Macros: [Calories, Protein (g), Carbs (g), Fats (g)]\n- Allergy Warnings: [e.g., Contains gluten, eggs, dairy, nuts, or state 'None']\n\nPlease ensure the output is structured and easy to parse.\n\nUser request: ${aiPrompt}`;
      const res = await fetch('/api/ai/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: primedPrompt }),
      });
      const data = await res.json();
      if (res.ok) {
        setAiResult(data.recipe);
      } else {
        setAiError(data.error || 'AI generation failed.');
      }
    } catch (err) {
      setAiError('AI generation failed.');
    } finally {
      setAiLoading(false);
    }
  }

  function handleAiSave() {
    // TODO: Save AI-generated recipe to DB
    closeModal();
  }

  async function handleGenerateImage() {
    setAiImageLoading(true);
    setAiImageError('');
    try {
      // Use form or AI result for prompt
      const name = form.name || aiResult?.name || 'Recipe';
      const ingredients = form.ingredients || aiResult?.ingredients?.join(', ') || '';
      const prompt = `A high-resolution, realistic photograph of ${name}, beautifully plated on a white ceramic dish, with natural lighting. The meal includes ${ingredients}. The setting is a modern kitchen. The food looks fresh and appetizing, professional food photography, no text, no watermark.`;
      const res = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (res.ok && data.imageUrl) {
        setAiImage(data.imageUrl);
        setGenerationsLeft(g => g - 1);
      } else {
        setAiImageError(data.error || 'Image generation failed.');
      }
    } catch (err) {
      setAiImageError('Image generation failed.');
    } finally {
      setAiImageLoading(false);
    }
  }

  // Mock diet type suggestion logic
  function getDietSuggestions(recipe: any) {
    const suggestions = [];
    if (recipe.ingredients) {
      const ings = recipe.ingredients.join(' ').toLowerCase();
      if (!ings.includes('meat') && !ings.includes('chicken') && !ings.includes('beef') && !ings.includes('fish')) suggestions.push('Vegetarian');
      if (!ings.includes('meat') && !ings.includes('chicken') && !ings.includes('beef') && !ings.includes('fish') && !ings.includes('egg') && !ings.includes('dairy')) suggestions.push('Vegan');
      if (!ings.includes('gluten')) suggestions.push('Gluten-Free');
      if (recipe.macros?.protein > 20) suggestions.push('High-Protein');
      if (recipe.macros?.carbs < 30) suggestions.push('Low-Carb');
    }
    return suggestions;
  }

  // When AI result is ready, enter review mode
  useEffect(() => {
    if (aiResult) {
      setEditRecipe({ ...aiResult });
      setReviewMode(true);
      const suggestions = getDietSuggestions(aiResult);
      setDietSuggestions(suggestions);
      setSelectedDiets(suggestions);
    }
  }, [aiResult]);

  function handleEditChange(field: string, value: any) {
    setEditRecipe((prev: any) => ({ ...prev, [field]: value }));
  }

  function toggleDietType(type: string) {
    setSelectedDiets((prev) => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  }

  function handleApproveSave() {
    // TODO: Save logic
    setReviewMode(false);
    setEditRecipe(null);
    setSelectedDiets([]);
    setDietSuggestions([]);
    setAiResult(null);
  }

  // Calculate grams from percentages and calories
  const calories = parseFloat(form.calories) || 0;
  const proteinPct = parseFloat(form.proteinPct) || 0;
  const carbsPct = parseFloat(form.carbsPct) || 0;
  const fatsPct = parseFloat(form.fatsPct) || 0;
  const proteinGrams = calories && proteinPct ? Math.round((calories * (proteinPct / 100)) / 4) : '';
  const carbsGrams = calories && carbsPct ? Math.round((calories * (carbsPct / 100)) / 4) : '';
  const fatsGrams = calories && fatsPct ? Math.round((calories * (fatsPct / 100)) / 9) : '';

  return (
    <div>
      {/* Modals */}
      {modalType === 'view' && selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Recipe Details</h3>
            <div className="mb-2 text-gray-800"><span className="font-semibold">Name:</span> {selectedRecipe.name}</div>
            <div className="mb-2 text-gray-800"><span className="font-semibold">Category:</span> {selectedRecipe.category}</div>
            <div className="mb-2 text-gray-800"><span className="font-semibold">Calories:</span> {selectedRecipe.calories}</div>
            <div className="mb-2 text-gray-800"><span className="font-semibold">Protein:</span> {selectedRecipe.protein}g</div>
            <div className="mb-2 text-gray-800"><span className="font-semibold">Carbs:</span> {selectedRecipe.carbs}g</div>
            <div className="mb-2 text-gray-800"><span className="font-semibold">Fats:</span> {selectedRecipe.fats}g</div>
            <div className="mb-2 text-gray-800"><span className="font-semibold">Created By:</span> {selectedRecipe.createdBy}</div>
            <button onClick={closeModal} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Close</button>
          </div>
        </div>
      )}
      {(modalType === 'edit' || modalType === 'create') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
            <h3 className="text-xl font-bold mb-4 text-gray-900">{modalType === 'edit' ? 'Edit Recipe' : 'Create Recipe'}</h3>
            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
              <input type="text" placeholder="Name" className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <input type="text" placeholder="Category" className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
              <input type="number" placeholder="Calories" className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400" value={form.calories} onChange={e => setForm(f => ({ ...f, calories: e.target.value }))} />
              <input type="number" placeholder="Protein (%)" min="0" max="100" className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400" value={form.proteinPct} onChange={e => setForm(f => ({ ...f, proteinPct: e.target.value }))} />
              {form.proteinPct && calories ? <div className="text-xs text-gray-500 ml-1">= {proteinGrams}g</div> : null}
              <input type="number" placeholder="Carbs (%)" min="0" max="100" className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400" value={form.carbsPct} onChange={e => setForm(f => ({ ...f, carbsPct: e.target.value }))} />
              {form.carbsPct && calories ? <div className="text-xs text-gray-500 ml-1">= {carbsGrams}g</div> : null}
              <input type="number" placeholder="Fats (%)" min="0" max="100" className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400" value={form.fatsPct} onChange={e => setForm(f => ({ ...f, fatsPct: e.target.value }))} />
              {form.fatsPct && calories ? <div className="text-xs text-gray-500 ml-1">= {fatsGrams}g</div> : null}
              <div className="text-xs text-gray-500 mt-1">Total must add up to 100%</div>
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              <div className="flex flex-col gap-2 mt-4">
                <div className="text-sm text-gray-600">AI generations left this month: <span className="font-bold">{generationsLeft}</span></div>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                  onClick={handleGenerateImage}
                  disabled={generationsLeft <= 0 || aiImageLoading}
                >
                  {aiImageLoading ? 'Generating...' : 'Generate AI Image'}
                </button>
                {generationsLeft <= 0 && (
                  <div className="text-xs text-red-500">You have reached your monthly AI image generation limit. <a href="#" className="underline">Upgrade your plan</a> or <a href="#" className="underline">pay per image</a>.</div>
                )}
                {aiImageError && <div className="text-xs text-red-500">{aiImageError}</div>}
                {aiImage && (
                  <img src={aiImage} alt="AI generated meal" className="mt-2 rounded-lg border shadow max-w-xs" />
                )}
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">{modalType === 'edit' ? 'Save Changes' : 'Create Recipe'}</button>
            </form>
          </div>
        </div>
      )}
      {modalType === 'assign' && selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Assign to Meal Plan</h3>
            <form className="flex flex-col gap-4" onSubmit={handleAssignSubmit}>
              <div className="mb-2 text-gray-800">Assign <span className="font-semibold">{selectedRecipe.name}</span> to meal plan(s):</div>
              <div className="flex flex-col gap-2">
                {mockMealPlans.map(plan => (
                  <label key={plan.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={assignPlans.includes(plan.id.toString())}
                      onChange={() => togglePlan(plan.id.toString())}
                    />
                    {plan.name}
                  </label>
                ))}
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Assign</button>
            </form>
          </div>
        </div>
      )}
      {modalType === 'delete' && selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Delete Recipe</h3>
            <div className="mb-4 text-gray-800">Are you sure you want to delete <span className="font-semibold">{selectedRecipe.name}</span>?</div>
            <div className="flex gap-4">
              <button onClick={handleDelete} className="px-4 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition">Yes, Delete</button>
              <button onClick={closeModal} className="px-4 py-2 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* AI Create Modal */}
      {modalType === 'ai' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative animate-fade-in">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Create Recipe with AI</h3>
            <form className="flex flex-col gap-4" onSubmit={handleAiSubmit}>
              <textarea
                placeholder="Describe the recipe you want (e.g., High-protein vegan dinner under 500 calories)"
                className="border border-gray-300 rounded-lg px-3 py-2 min-h-[80px] text-gray-800 placeholder-gray-400"
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                required
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition" disabled={aiLoading}>
                {aiLoading ? 'Generating...' : 'Generate Recipe'}
              </button>
            </form>
            {aiError && <div className="text-red-500 text-sm mt-2">{aiError}</div>}
            {aiResult && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-bold mb-2 text-gray-900">AI-Generated Recipe</h4>
                <div className="text-gray-800"><span className="font-semibold">Name:</span> {aiResult.name}</div>
                <div className="text-gray-800"><span className="font-semibold">Category:</span> {aiResult.category}</div>
                <div className="text-gray-800"><span className="font-semibold">Calories:</span> {aiResult.calories}</div>
                <div className="text-gray-800"><span className="font-semibold">Protein:</span> {aiResult.protein}g</div>
                <div className="text-gray-800"><span className="font-semibold">Carbs:</span> {aiResult.carbs}g</div>
                <div className="text-gray-800"><span className="font-semibold">Fats:</span> {aiResult.fats}g</div>
                <div className="text-gray-800"><span className="font-semibold">Ingredients:</span> <ul className="list-disc ml-6">{aiResult.ingredients?.map((ing: string, i: number) => <li key={i}>{ing}</li>)}</ul></div>
                <div className="text-gray-800"><span className="font-semibold">Instructions:</span> <ol className="list-decimal ml-6">{aiResult.instructions?.map((step: string, i: number) => <li key={i}>{step}</li>)}</ol></div>
                <button onClick={handleAiSave} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition">Save Recipe</button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Review and Edit Modal */}
      {reviewMode && editRecipe && (
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Review & Edit Recipe</h3>
            {/* Editable Recipe Card */}
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-1">Name</label>
              <input type="text" className="border rounded-lg px-3 py-2 w-full mb-2" value={editRecipe.name} onChange={e => handleEditChange('name', e.target.value)} />
              <label className="block font-semibold text-gray-700 mb-1">Category</label>
              <input type="text" className="border rounded-lg px-3 py-2 w-full mb-2" value={editRecipe.category} onChange={e => handleEditChange('category', e.target.value)} />
              <label className="block font-semibold text-gray-700 mb-1">Prep Time</label>
              <input type="text" className="border rounded-lg px-3 py-2 w-full mb-2" value={editRecipe.prepTime || ''} onChange={e => handleEditChange('prepTime', e.target.value)} />
              <label className="block font-semibold text-gray-700 mb-1">Ingredients</label>
              <textarea className="border rounded-lg px-3 py-2 w-full mb-2" rows={3} value={editRecipe.ingredients?.join('\n') || ''} onChange={e => handleEditChange('ingredients', e.target.value.split('\n'))} />
              <label className="block font-semibold text-gray-700 mb-1">Instructions</label>
              <textarea className="border rounded-lg px-3 py-2 w-full mb-2" rows={3} value={editRecipe.instructions?.join('\n') || ''} onChange={e => handleEditChange('instructions', e.target.value.split('\n'))} />
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Calories</label>
                  <input type="number" className="border rounded-lg px-3 py-2 w-full" value={editRecipe.macros?.calories || ''} onChange={e => handleEditChange('macros', { ...editRecipe.macros, calories: e.target.value })} />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Protein (g)</label>
                  <input type="number" className="border rounded-lg px-3 py-2 w-full" value={editRecipe.macros?.protein || ''} onChange={e => handleEditChange('macros', { ...editRecipe.macros, protein: e.target.value })} />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Carbs (g)</label>
                  <input type="number" className="border rounded-lg px-3 py-2 w-full" value={editRecipe.macros?.carbs || ''} onChange={e => handleEditChange('macros', { ...editRecipe.macros, carbs: e.target.value })} />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Fats (g)</label>
                  <input type="number" className="border rounded-lg px-3 py-2 w-full" value={editRecipe.macros?.fats || ''} onChange={e => handleEditChange('macros', { ...editRecipe.macros, fats: e.target.value })} />
                </div>
              </div>
              <label className="block font-semibold text-gray-700 mb-1">Allergy Warnings</label>
              <input type="text" className="border rounded-lg px-3 py-2 w-full mb-2" value={editRecipe.allergyWarnings || ''} onChange={e => handleEditChange('allergyWarnings', e.target.value)} />
            </div>
            {/* Diet Type Suggestions */}
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-1">Suggested Diet Types</div>
              <div className="flex flex-wrap gap-2">
                {dietSuggestions.map(type => (
                  <button
                    key={type}
                    type="button"
                    className={`px-3 py-1 rounded-full border font-semibold text-sm transition ${selectedDiets.includes(type) ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
                    onClick={() => toggleDietType(type)}
                  >
                    {type}
                  </button>
                ))}
                {/* Manual selection */}
                {['Keto', 'Paleo', 'Dairy-Free', 'Nut-Free'].map(type => !dietSuggestions.includes(type) && (
                  <button
                    key={type}
                    type="button"
                    className={`px-3 py-1 rounded-full border font-semibold text-sm transition ${selectedDiets.includes(type) ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
                    onClick={() => toggleDietType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition" onClick={handleApproveSave}>Approve & Save</button>
          </div>
        </div>
      )}
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Recipes Management</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button onClick={() => openModal('create')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Create Recipe</button>
          <button onClick={() => openModal('ai')} className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition">Create with AI</button>
        </div>
      </div>
      {/* Recipes Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white/80">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Calories</th>
              <th className="py-3 px-4">Protein (g)</th>
              <th className="py-3 px-4">Carbs (g)</th>
              <th className="py-3 px-4">Fats (g)</th>
              <th className="py-3 px-4">Created By</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecipes.map(recipe => (
              <tr key={recipe.id} className="border-b hover:bg-blue-50">
                <td className="py-3 px-4 font-medium text-gray-900">{recipe.name}</td>
                <td className="py-3 px-4 text-gray-800">{recipe.category}</td>
                <td className="py-3 px-4 text-gray-800">{recipe.calories}</td>
                <td className="py-3 px-4 text-gray-800">{recipe.protein}</td>
                <td className="py-3 px-4 text-gray-800">{recipe.carbs}</td>
                <td className="py-3 px-4 text-gray-800">{recipe.fats}</td>
                <td className="py-3 px-4 text-gray-800">{recipe.createdBy}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button onClick={() => openModal('view', recipe)} className="text-blue-600 hover:underline text-sm">View</button>
                  <button onClick={() => openModal('edit', recipe)} className="text-yellow-600 hover:underline text-sm">Edit</button>
                  <button onClick={() => openModal('delete', recipe)} className="text-red-600 hover:underline text-sm">Delete</button>
                  <button onClick={() => openModal('assign', recipe)} className="text-green-600 hover:underline text-sm">Assign to Plan</button>
                </td>
              </tr>
            ))}
            {filteredRecipes.length === 0 && (
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-400">No recipes found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98);} to { opacity: 1; transform: scale(1);} }
      `}</style>
    </div>
  );
} 